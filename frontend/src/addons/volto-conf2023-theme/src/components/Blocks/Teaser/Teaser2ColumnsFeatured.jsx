import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { defineMessages, useIntl } from 'react-intl';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Grid, Message } from 'semantic-ui-react';

import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import deserialize from '@plone/volto-slate/editor/deserialize';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import {
  makeEditor,
  createEmptyParagraph,
  normalizeExternalData,
} from '@plone/volto-slate/utils';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import Picture from 'volto-conf2023-theme/components/Picture/Picture';

import StringToHTML from '../../helpers/StringToHTML';
import cx from 'classnames';
import PropTypes from 'prop-types';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const ImageContainer = (props) => {
  const { image, alt } = props;
  return (
    <Picture
      source="teaser2columns"
      className="home-featured-image"
      content={image}
      imageBase={flattenToAppURL(
        `${image['@id']}/@@images/${image.image_field}`,
      )}
      alt={alt}
    ></Picture>
  );
};

const Teaser2ColumnsFeatured = (props) => {
  const {
    data,
    isEditMode,
    id,
    onChangeBlock,
    block,
    selected,
    properties,
  } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];

  const editor = React.useMemo(() => makeEditor(), []);
  const token = useSelector((state) => state.userSession.token);
  const value = data.richtext ?? { data: '' };
  const toHtml = React.useCallback(
    (value) => {
      const mockStore = configureStore();
      const html = ReactDOMServer.renderToStaticMarkup(
        <Provider store={mockStore({ userSession: { token } })}>
          <MemoryRouter>{serializeNodes(value || [])}</MemoryRouter>
        </Provider>,
      );
      return {
        'content-type': value ? value['content-type'] : 'text/html',
        encoding: value ? value.encoding : 'utf8',
        data: html,
      };
    },
    [token],
  );
  const fromHtml = React.useCallback(
    (value) => {
      try {
        const html = value?.data || '';

        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const body =
          parsed.getElementsByTagName('google-sheets-html-origin').length > 0
            ? parsed.querySelector('google-sheets-html-origin > table')
            : parsed.body;
        let data = deserialize(editor, body);
        data = normalizeExternalData(editor, data);
        const res = data.length ? data : [createEmptyParagraph()];
        return res;
      } catch {
        return;
      }
    },
    [editor],
  );

  const valueFromHtml = React.useMemo(() => {
    return fromHtml(value);
  }, [value, fromHtml]);
  const handleChange = React.useCallback(
    (newValue) => {
      onChangeBlock(id, {
        ...data,
        richtext: toHtml(newValue),
      });
    },
    /* eslint-disable-next-line */
    [onChangeBlock, toHtml, id],
  );

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="home-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <div className="home-teaser-item featured">
          <Grid className="home-teaser-item-content" columns={2} stackable>
            {(href.hasPreviewImage || image) && data.imageSide === 'left' && (
              <Grid.Column className="grid-image-wrapper-column">
                <ImageContainer image={image} alt={data?.title} />
              </Grid.Column>
            )}
            <Grid.Column
              className={cx(data.imageSide, 'grid-text-wrapper-column')}
            >
              <div className={cx(data.imageSide, 'grid-text-wrapper')}>
                {data?.title && (
                  <h3 className="home-teaser-item-title">{data?.title}</h3>
                )}

                {data?.subtitle && (
                  <h4 className="home-teaser-item-subtitle">
                    {data?.subtitle}
                  </h4>
                )}
                {isEditMode ? (
                  <SlateEditor
                    id={id}
                    name={id}
                    value={valueFromHtml}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    block={block}
                    selected={selected}
                    properties={properties}
                  />
                ) : (
                  <StringToHTML string={data?.richtext?.data} />
                )}
              </div>
            </Grid.Column>
            {(href.hasPreviewImage || image) && data.imageSide === 'right' && (
              <Grid.Column className="grid-image-wrapper-column">
                <ImageContainer image={image} alt={data?.title} />
              </Grid.Column>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

Teaser2ColumnsFeatured.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default Teaser2ColumnsFeatured;

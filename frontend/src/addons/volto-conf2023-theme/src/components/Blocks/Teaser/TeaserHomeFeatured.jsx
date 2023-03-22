import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Grid, Message, Icon } from 'semantic-ui-react';

import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import deserialize from '@plone/volto-slate/editor/deserialize';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import {
  makeEditor,
  createEmptyParagraph,
  normalizeExternalData,
} from '@plone/volto-slate/utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { getTeaserImageURL } from '@plone/volto/components/manage/Blocks/Teaser/utils';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import StringToHTML from '../../helpers/StringToHTML';

import PropTypes from 'prop-types';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});
const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

const ImageContainer = (props) => {
  const { hasImageComponent, href, defaultImageSrc } = props;
  const Image = config.getComponent('Image').component || DefaultImage;
  return (
    <div className="grid-image-wrapper">
      <Image
        src={hasImageComponent ? href : defaultImageSrc}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

const TeaserHomeFeatured = (props) => {
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
  const align = data?.styles?.align;

  const hasImageComponent = config.getComponent('Image').component;
  const { openExternalLinkInNewTab } = config.settings;
  const defaultImageSrc =
    href && flattenToAppURL(getTeaserImageURL({ href, image, align }));

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
          <Grid className="home-teaser-item-content" columns={2}>
            {(href.hasPreviewImage || image) && data.imageSide === 'left' && (
              <Grid.Column>
                <ImageContainer
                  hasImageComponent={hasImageComponent}
                  href={href}
                  defaultImageSrc={defaultImageSrc}
                />
              </Grid.Column>
            )}
            <Grid.Column>
              <Grid.Row>
                {data?.title && (
                  <h2 className="home-teaser-item-title">{data?.title}</h2>
                )}
              </Grid.Row>
              {data?.subtitle && (
                <Grid.Row>
                  <h3 className="home-teaser-item-subtitle">
                    {data?.subtitle}
                  </h3>
                </Grid.Row>
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
              <Grid.Row className="home-teaser-item-read-more">
                <MaybeWrap
                  condition={!isEditMode}
                  as={UniversalLink}
                  href={href['@id']}
                  target={
                    data.openLinkInNewTab ||
                    (openExternalLinkInNewTab && !isInternalURL(href['@id']))
                      ? '_blank'
                      : null
                  }
                >
                  <FormattedMessage id="Read more" defaultMessage="Read more" />
                  <Icon name="add" />
                </MaybeWrap>
              </Grid.Row>
            </Grid.Column>
            {(href.hasPreviewImage || image) && data.imageSide === 'right' && (
              <Grid.Column>
                <ImageContainer
                  hasImageComponent={hasImageComponent}
                  href={href}
                  defaultImageSrc={defaultImageSrc}
                />
              </Grid.Column>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

TeaserHomeFeatured.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserHomeFeatured;

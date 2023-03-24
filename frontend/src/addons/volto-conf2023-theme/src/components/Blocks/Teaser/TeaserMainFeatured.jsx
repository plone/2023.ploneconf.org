import React from 'react';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Grid, Message, Icon } from 'semantic-ui-react';

import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { getTeaserImageURL } from '@plone/volto/components/manage/Blocks/Teaser/utils';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

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
  const { data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;

  const hasImageComponent = config.getComponent('Image').component;
  const { openExternalLinkInNewTab } = config.settings;
  const defaultImageSrc =
    href && flattenToAppURL(getTeaserImageURL({ href, image, align }));

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="main-teaser-item">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <div className="main-teaser-item featured">
          {(href.hasPreviewImage || image) && (
            <ImageContainer
              hasImageComponent={hasImageComponent}
              href={href}
              defaultImageSrc={defaultImageSrc}
            />
          )}
          <div className="main-teaser-item-content">
            <Grid>
              <Grid.Row>
                {data?.title && (
                  <h3 className="main-teaser-item-title">{data?.title}</h3>
                )}
              </Grid.Row>
              {data?.description && (
                <Grid.Row className="main-teaser-item-description">
                  {data?.description}
                </Grid.Row>
              )}
              <Grid.Row>
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
            </Grid>
          </div>
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

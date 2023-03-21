import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { Label, Message } from "semantic-ui-react";

import { MaybeWrap } from "@plone/volto/components";
import { UniversalLink } from "@plone/volto/components";
import imageBlockSVG from "@plone/volto/components/manage/Blocks/Image/block-image.svg";
import { getTeaserImageURL } from "@plone/volto/components/manage/Blocks/Teaser/utils";
import { flattenToAppURL } from "@plone/volto/helpers";
import config from "@plone/volto/registry";

import PropTypes from "prop-types";

const messages = defineMessages({
  PleaseChooseContent: {
    id: "Please choose an existing content as source for this element",
    defaultMessage:
      "Please choose an existing content as source for this element",
  },
});
const DefaultImage = (props) => <img {...props} alt={props.alt || ""} />;

const ImageContainer = (props) => {
  const { hasImageComponent, href, defaultImageSrc, data } = props;
  const Image = config.getComponent("Image").component || DefaultImage;
  return (
    <div className="grid-image-wrapper">
      <Image
        src={hasImageComponent ? href : defaultImageSrc}
        alt=""
        loading="lazy"
      />
      <Label size="huge" attached="bottom right">
        {data?.title}
      </Label>
    </div>
  );
};

const TeaserHomeFeatured = (props) => {
  const { data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;

  const hasImageComponent = config.getComponent("Image").component;
  const { openExternalLinkInNewTab } = config.settings;
  const defaultImageSrc =
    href && flattenToAppURL(getTeaserImageURL({ href, image, align }));
  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <div className="grid-teaser-item featured">
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href["@id"]}
            target={
              data.openLinkInNewTab ||
              (openExternalLinkInNewTab && !isInternalURL(href["@id"]))
                ? "_blank"
                : null
            }
          >
            {(href.hasPreviewImage || image) && data.imageSide === "left" && (
              <ImageContainer
                hasImageComponent={hasImageComponent}
                href={href}
                defaultImageSrc={defaultImageSrc}
                data={data}
              />
            )}
            <div className="content">
              {data?.head_title && <h2>{data?.head_title}</h2>}
              {!data.hide_description && <p>{data?.description}</p>}
            </div>
            {(href.hasPreviewImage || image) && data.imageSide === "right" && (
              <ImageContainer
                hasImageComponent={hasImageComponent}
                href={href}
                defaultImageSrc={defaultImageSrc}
                data={data}
              />
            )}
          </MaybeWrap>
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

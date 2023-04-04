import React from 'react';
import { Image } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Picture = ({
  imageBase,
  alt,
  source,
  lazy = true,
  content,
  className,
  ...props
}) => {
  const pictureOptions = config.settings.pictureOptions;
  let sources = [];
  if (Object.keys(pictureOptions).includes(source)) {
    sources = pictureOptions[source];
  } else {
    sources = pictureOptions[Object.keys(pictureOptions)[0]];
  }
  return (
    imageBase && (
      <picture className={className}>
        {sources.map((source, key) => {
          return (
            <source
              key={key}
              media={source.media}
              width={content ? content.image.scales[source.image].width : null}
              height={
                content ? content.image.scales[source.image].height : null
              }
              srcSet={`${imageBase}/${source.image}`}
            />
          );
        })}
        {lazy ? (
          <LazyLoadImage
            alt={alt}
            src={`${imageBase}/large`}
            className="ui image"
            width={content ? '100%' : null}
            height={content ? 'auto' : null}
          />
        ) : (
          <Image
            alt={alt}
            src={`${imageBase}/teaser`}
            width={content ? '100%' : null}
            height={content ? 'auto' : null}
          />
        )}
      </picture>
    )
  );
};

export default Picture;

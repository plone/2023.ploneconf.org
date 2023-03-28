import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Image, Icon, Grid } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';

const NewsListingBody = (props) => {
  const { items, isEditMode, homeBlock } = props;
  const newsLink = '/news';

  return (
    <div
      className={
        homeBlock
          ? 'news-listing home-news-listing ui container'
          : 'news-listing'
      }
    >
      <h2 className="">
        <FormattedMessage id="News" defaultMessage="News" />
      </h2>
      <Grid className="news-listing" columns={3} stackable>
        {items.map((item, index) => {
          return (
            <Grid.Column key={index}>
              {item.image_field && (
                <ConditionalLink item={item} condition={!isEditMode}>
                  <Image src={`${item['@id']}/@@images/${item.image_field}`} />
                </ConditionalLink>
              )}

              <ConditionalLink item={item} condition={!isEditMode}>
                <h3 className="news-listing-title">{item.title}</h3>
              </ConditionalLink>

              {item.description && (
                <span className="news-listing-description">
                  {item.description}
                </span>
              )}
            </Grid.Column>
          );
        })}
      </Grid>
      <div className="read-more">
        <a href={newsLink} className="news-listing-more">
          <FormattedMessage id="More News" defaultMessage="More News" />
          <Icon name="add" />
        </a>
      </div>
    </div>
  );
};

export default injectIntl(NewsListingBody);

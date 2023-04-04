import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon, Grid } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';
import Picture from 'volto-conf2023-theme/components/Picture/Picture';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { useSelector } from 'react-redux';

const NewsListingBody = (props) => {
  const { items, isEditMode, homeBlock, moment: momentlib } = props;
  const newsLink = '/news';
  const lang = useSelector((state) => state.intl.locale);
  const moment = momentlib.default;
  moment.locale(lang);
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
                  <Picture
                    source="grid"
                    imageBase={`${item['@id']}/@@images/${item.image_field}`}
                    alt={item.title}
                  ></Picture>
                </ConditionalLink>
              )}

              <div className="news-date">
                {item.effective && <p>{moment(item.effective).format('L')}</p>}
              </div>
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

export default injectLazyLibs(['moment'])(injectIntl(NewsListingBody));

import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Image, Icon, Grid } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';

const PersonsListingBody = (props) => {
  const { items, isEditMode, homeBlock } = props;
  const speakersLink = '/speakers';

  return (
    <div
      className={
        homeBlock
          ? 'speakers-listing home-speakers-listing'
          : 'speakers-listing'
      }
    >
      <h2 className="">
        <FormattedMessage id="Speakers" defaultMessage="Speakers" />
      </h2>
      <Grid className="speakers-listing" columns={4} stackable>
        {items.map((item, index) => {
          return (
            <Grid.Column key={index}>
              {item.image_field && (
                <Grid.Row>
                  <ConditionalLink item={item} condition={!isEditMode}>
                    <Image
                      src={`${item['@id']}/@@images/${item.image_field}`}
                    />
                  </ConditionalLink>
                </Grid.Row>
              )}
              <Grid.Row>
                <ConditionalLink item={item} condition={!isEditMode}>
                  <h3 className="speakers-listing-title">{item.title}</h3>
                </ConditionalLink>
              </Grid.Row>
              {item.description && (
                <Grid.Row>
                  <span className="speakers-listing-description"></span>
                  {item.description}
                </Grid.Row>
              )}
            </Grid.Column>
          );
        })}
      </Grid>
      <a href={speakersLink} className="speakers-listing-more">
        <FormattedMessage
          id="View all speakers"
          defaultMessage="View all speakers"
        />
        <Icon name="add" />
      </a>
    </div>
  );
};

export default injectIntl(PersonsListingBody);

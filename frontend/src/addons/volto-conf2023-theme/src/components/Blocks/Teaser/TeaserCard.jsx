import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserCard = (props) => {
  const { data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <div className={cx(data.color, 'card-teaser-item')}>
          <Grid className="card-teaser-item-content">
            <Grid.Row>
              <MaybeWrap
                condition={!isEditMode}
                as={UniversalLink}
                href={href['@id']}
                target={data.openLinkInNewTab ? '_blank' : null}
              >
                <h2 className="card-teaser-item-title">{data?.title}</h2>
              </MaybeWrap>
            </Grid.Row>
            {data.subtitle && (
              <Grid.Row>
                <h3 className="card-teaser-item-subtitle">{data?.subtitle}</h3>
              </Grid.Row>
            )}
            {data.description && (
              <Grid.Row className="card-teaser-item-description">
                {data?.description}
              </Grid.Row>
            )}
            {data.dates && (
              <Grid.Row className="card-teaser-item-dates">
                {data?.dates}
              </Grid.Row>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

TeaserCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserCard;

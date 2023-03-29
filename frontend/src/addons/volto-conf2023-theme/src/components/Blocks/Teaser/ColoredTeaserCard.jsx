import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
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

const ColoredTeaserCard = (props) => {
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
          <div className="card-teaser-item-content">
            <MaybeWrap
              condition={!isEditMode}
              as={UniversalLink}
              href={href['@id']}
              className="stretched-link"
              target={data.openLinkInNewTab ? '_blank' : null}
            >
              <h2 className="card-teaser-item-title">{data?.title}</h2>
            </MaybeWrap>

            {data.subtitle && (
              <h3 className="card-teaser-item-subtitle">{data?.subtitle}</h3>
            )}
            {data.description && (
              <div className="card-teaser-item-description">
                {data?.description}
              </div>
            )}
            {data.dates && (
              <div className="card-teaser-item-dates">{data?.dates}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

ColoredTeaserCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default ColoredTeaserCard;

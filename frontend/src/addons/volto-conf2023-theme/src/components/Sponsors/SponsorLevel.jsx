/**
 * SponsorLevel container.
 * @module components/Sponsors/SponsorLevel
 */
import React from 'react';
import PropTypes from 'prop-types';
import Sponsor from './Sponsor';
import { FormattedMessage, injectIntl } from 'react-intl';
import bronzeSponsorSVG from '../../icons/bronzeSponsor.svg';
import silverSponsorSVG from '../../icons/silverSponsor.svg';
import goldSponsorSVG from '../../icons/goldSponsor.svg';
import patronSVG from '../../icons/patron.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';

/**
 * SponsorLevel function.
 * @function SponsorLevel
 * @returns {JSX.Element} Markup of the a SponsorLevel option.
 */
function SponsorLevel({ levelId, title, sponsors }) {
  const iconSponsor = {
    diamond: null,
    platinum: null,
    gold: goldSponsorSVG,
    silver: silverSponsorSVG,
    bronze: bronzeSponsorSVG,
    supporting: null,
    oss: null,
    patron: patronSVG,
    organizer: null,
  };

  return (
    <div id={levelId} className="sponsorLevel">
      <h3 className="underlined-header">
        {levelId === 'patron' && (
          <FormattedMessage id="Under the" defaultMessage="Under the" />
        )}{' '}
        <span className="sponsor_title">{title}</span>{' '}
        {levelId !== 'organizer' && levelId !== 'patron' && (
          <FormattedMessage id="Sponsor" defaultMessage="Sponsor" />
        )}
        {levelId === 'patron' && (
          <FormattedMessage id="of" defaultMessage="of" />
        )}
      </h3>
      <div className="sponsorList">
        {sponsors &&
          sponsors.map(function (sponsor, i) {
            return <Sponsor content={sponsor} key={i} />;
          })}
      </div>
    </div>
  );
}

SponsorLevel.propTypes = {
  levelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sponsors: PropTypes.array.isRequired,
};

export default injectIntl(SponsorLevel);

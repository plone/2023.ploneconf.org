/**
 * NewsItemView view component.
 * @module components/theme/View/NewsItemView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import { hasBlocksData } from '@plone/volto/helpers';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Picture from 'volto-conf2023-theme/components/Picture/Picture';
/**
 * NewsItemView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const NewsItemView = ({ content }) => {
  let lang = useSelector((state) => state.intl.locale);
  moment.locale(lang);
  return (
    <Container className="view-wrapper grid stackable">
      <Grid.Row>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={10}>
          {content.title && (
            <h1 className="documentFirstHeading">
              {content.title}
              {content.subtitle && ` - ${content.subtitle}`}
            </h1>
          )}
          {content.effective && <div className="news-date">{moment(content?.effective).format('LL')}</div>}
          {content.image && <Picture source="newsitem" imageBase={`${content['@id']}/@@images/image`} alt={content.title}></Picture>}
          {content.description && <p className="documentDescription">{content.description}</p>}
          {hasBlocksData(content) && <RenderBlocks content={content} />}
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid.Row>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
NewsItemView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default NewsItemView;

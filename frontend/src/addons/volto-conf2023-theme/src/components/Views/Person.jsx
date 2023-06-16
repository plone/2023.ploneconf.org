import React from 'react';
import { Container, Tab, Grid } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import githubSVG from '../../icons/github.svg';
import twitterSVG from '../../icons/twitter.svg';
import { Link } from 'react-router-dom';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import ScheduleInfo from '../Session/ScheduleInfo/ScheduleInfo';
import SessionInfo from '../Session/SessionInfo/SessionInfo';

const Person = ({ content }) => {
  return (
    <Container className="person-view">
      <Grid columns={2} stackable>
        <Grid.Column width={4} className="speaker-image-wrapper">
          <div className="speakers-preview-image">
            {content.image ? (
              <img
                src={flattenToAppURL(content.image.scales.preview.download)}
                alt={content.image_caption}
              />
            ) : (
              <img src={DefaultImageSVG} alt="" />
            )}
          </div>
          <div className="person-social">
            {content.github && (
              <a href={`https://github.com/${content.github}`}>
                <Icon name={githubSVG} size="18px" />
              </a>
            )}

            {content.twitter && (
              <a
                href={`https://twitter.com/${content.twitter.replace('@', '')}`}
              >
                <Icon name={twitterSVG} size="18px" />
              </a>
            )}
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <h1>{content.title}</h1>

          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
          <div className="person-content">
            {content?.activities?.length > 0 && (
              <div className="person-activities">
                <Tab
                  menu={{
                    secondary: true,
                    pointing: true,
                    attached: true,
                    tabular: true,
                    className: 'formtabs',
                  }}
                  className="tabs-wrapper"
                  renderActiveOnly={false}
                  panes={content?.activities?.map((activity) => ({
                    menuItem: activity['@type'],
                    pane: (
                      <Tab.Pane key={activity['@type']}>
                        {activity?.items?.map((item, idx) => (
                          <div className="person-activity" key={idx}>
                            <Link to={flattenToAppURL(item['@id'])}>
                              <h2>{item.title}</h2>
                              <ScheduleInfo
                                start={item.start}
                                end={item.end}
                                track={item.track}
                              />
                              <SessionInfo
                                audience={item.audience}
                                level={item.level}
                              />
                            </Link>
                          </div>
                        ))}
                      </Tab.Pane>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <div className="person-header"></div>
    </Container>
  );
};

export default Person;

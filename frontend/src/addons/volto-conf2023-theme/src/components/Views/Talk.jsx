import React from 'react';
import { Container } from 'semantic-ui-react';
import PresentersInfo from '../Session/PresentersInfo/PresentersInfo';
import ScheduleInfo from '../Session/ScheduleInfo/ScheduleInfo';
import SessionInfo from '../Session/SessionInfo/SessionInfo';
import { Embed } from 'semantic-ui-react';
import cx from 'classnames';

const Talk = ({ content }) => {
  return (
    <Container
      className={cx('talk-view', {
        'too-many-speakers': content.presenters?.length > 2,
      })}
    >
      <div className="talk-header">
        <div className="talk-content">
          <h1>{content.title}</h1>
          <ScheduleInfo
            start={content.start}
            end={content.end}
            track={content.track}
            url={content['@id']}
          />
          <SessionInfo
            audience={content.session_audience}
            level={content.session_level}
          />
          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
        </div>
        <PresentersInfo content={content} />
      </div>
      {(content.slides_url || content.slides_embed) && (
        <h3 className="underlined-header">Slides</h3>
      )}
      {content.slides_url && (
        <div className="slide-link-wrapper">
          <a className="ui button primary" href={content.slides_url}>
            Slides URL
          </a>
        </div>
      )}
      {content.slides_embed && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.slides_embed,
          }}
        />
      )}
      {content.video_url && (
        <>
          <h3 className="underlined-header">Recorded talk</h3>
          <div className="video-inner">
            <Embed
              id={
                content.video_url.match(/.be\//)
                  ? content.video_url.match(/^.*\.be\/(.*)/)[1]
                  : content.video_url.match(/^.*\?v=(.*)$/)[1]
              }
              source="youtube"
              icon="play"
              defaultActive
              autoplay={false}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Talk;

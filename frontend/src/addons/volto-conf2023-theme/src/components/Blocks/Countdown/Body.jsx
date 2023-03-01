/**
 * View Countdown block
 * @module components/Blocks/Countdown/View
 */
import React from 'react';
import Timer from 'react-compound-timer';
import moment from 'moment';
import { CTA } from '@package/components';
import { Icon } from 'semantic-ui-react';
import { injectIntl, FormattedMessage } from 'react-intl';

const Body = (props) => {
  const { data } = props;

  const remainTime = moment(data.date).format('x') - moment().utc().format('x');
  return (
    <section className="title-block countdown block">
      <div className="countdown-inner-wrapper">
        <aside>
          <h3>
            {data.addText && (
              <div className="additional-text">{data.addText}</div>
            )}

            <div className="default-text">
              <FormattedMessage
                id="The community is waiting for you"
                defaultMessage="The community is waiting for you"
              />
            </div>
          </h3>
          <CTA
            content={
              <>
                <FormattedMessage
                  id="Register now!"
                  defaultMessage="Register now!"
                />{' '}
                <Icon name="ticket" />
              </>
            }
            href="https://2022.ploneconf.org/tickets"
            className="cta-register"
            notContainer
          />
        </aside>
        <article className="block-element">
          <span className="subtitle">
            <FormattedMessage id="Join us for" defaultMessage="Join us for" />{' '}
          </span>
          <h2>
            <FormattedMessage
              id="this new plone conference"
              defaultMessage="this new plone conference"
            />
          </h2>
          <div className="timer">
            {remainTime > 0 && (
              <Timer initialTime={remainTime} direction="backward">
                {() => (
                  <>
                    <div className="days">
                      <div className="days-n">
                        <Timer.Days />
                      </div>
                      <div className="days-b">
                        <FormattedMessage id="days" defaultMessage="days" />
                      </div>
                    </div>
                    <div className="hours">
                      <div className="hours-n">
                        <Timer.Hours />
                      </div>
                      <div className="hours-b">
                        <FormattedMessage id="hours" defaultMessage="hours" />
                      </div>
                    </div>
                    <div className="minutes">
                      <div className="minutes-n">
                        <Timer.Minutes />
                      </div>
                      <div className="minutes-b">
                        <FormattedMessage
                          id="minutes"
                          defaultMessage="minutes"
                        />
                      </div>
                    </div>
                    <div className="seconds">
                      <div className="seconds-n">
                        <Timer.Seconds />
                      </div>
                      <div className="seconds-b">
                        <FormattedMessage
                          id="seconds"
                          defaultMessage="seconds"
                        />
                      </div>
                    </div>
                  </>
                )}
              </Timer>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default injectIntl(Body);

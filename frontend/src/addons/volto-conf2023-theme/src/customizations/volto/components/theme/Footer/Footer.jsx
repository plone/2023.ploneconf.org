/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { flattenToAppURL, addAppURL } from '@plone/volto/helpers';
import footerVerticalLogo from 'volto-conf2023-theme/../theme/assets/images/LogoVerticalWhite.svg';
import ploneFoundationLogo from 'volto-conf2023-theme/../theme/assets/images/plone-foundation-logo.svg';
import codesyntaxLogo from 'volto-conf2023-theme/../theme/assets/images/CodeSyntax.svg';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const { settings } = config;
  const { lang, siteActions = [] } = useSelector(
    (state) => ({
      lang: state.intl.locale,
      siteActions: state.actions?.actions?.site_actions,
    }),
    shallowEqual,
  );

  return (
    <div id="footer">
      <div className="ui container">
        <div className="ploneconf-footer bg-tertiary">
          <div className="ploneconf-footer-organizer">
            <span className="organizer-title">The organizer</span>
            <Image
              src={codesyntaxLogo}
              alt="CodeSyntax Logo"
              title="CodeSyntax"
            />
            <p className="organizer-address">
              Azitaingo Industrialdea 3K <br />
              E-20600 EIBAR <br />
              (+34) 943 82 17 80
              <br />
              info@codesyntax.com
            </p>
          </div>
          <div className="ploneconf-footer-vertical-logo">
            <Image
              src={footerVerticalLogo}
              alt="Plone Conference 2023 Logo"
              title="Plone Conference 2023"
            />
          </div>
        </div>
        <div className="foundation-footer bg-primary">
          <div className="foundation-footer-logo">
            <Image
              src={ploneFoundationLogo}
              alt="Plone Foundation Logo"
              title="Plone Foundation"
            />
            <div class="foundation-text">
              <FormattedMessage
                id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
                defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
                values={{
                  plonecms: (
                    <FormattedMessage
                      id="Plone{reg} Open Source CMS/WCM"
                      defaultMessage="Plone{reg} Open Source CMS/WCM"
                      values={{ reg: <sup>®</sup> }}
                    />
                  ),
                  copyright: (
                    <abbr title={intl.formatMessage(messages.copyright)}>
                      ©
                    </abbr>
                  ),
                  current_year: new Date().getFullYear(),
                  plonefoundation: (
                    <a className="item" href="http://plone.org/foundation">
                      <FormattedMessage
                        id="Plone Foundation"
                        defaultMessage="Plone Foundation"
                      />
                    </a>
                  ),
                }}
              />{' '}
              <FormattedMessage
                id="Distributed under the {license}."
                defaultMessage="Distributed under the {license}."
                values={{
                  license: (
                    <a
                      className="item"
                      href="http://creativecommons.org/licenses/GPL/2.0/"
                    >
                      <FormattedMessage
                        id="GNU GPL license"
                        defaultMessage="GNU GPL license"
                      />
                    </a>
                  ),
                }}
              />
            </div>
            <div className="site-actions">
              {siteActions?.length
                ? map(siteActions, (item) => (
                    <div role="listitem" className="item" key={item.id}>
                      <UniversalLink
                        className="item"
                        href={
                          settings.isMultilingual
                            ? `/${lang}/${
                                item.url
                                  ? flattenToAppURL(item.url)
                                  : addAppURL(item.id)
                              }`
                            : item.url
                            ? flattenToAppURL(item.url)
                            : addAppURL(item.id)
                        }
                      >
                        {item?.title}
                      </UniversalLink>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);

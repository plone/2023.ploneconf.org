import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';

const Sponsor = ({ content }) => {
  const remoteUrl = content.remoteUrl;
  const token = useSelector((state) => state.userSession?.token);
  React.useEffect(() => {
    if (!token) {
      window.location.href = remoteUrl;
    }
  }, [token, remoteUrl]);

  return !token ? (
    // <Redirect to={remoteUrl} />
    <p>
      <FormattedMessage id="Loading..." defaultMessage="Loading..." />
    </p>
  ) : (
    <Container className="view-wrapper grid stackable">
      {remoteUrl && (
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={8}>
            {content.title && (
              <h1 className="documentFirstHeading">{content.title}</h1>
            )}
            <p>
              The link address is:
              <UniversalLink href={remoteUrl}>
                {flattenToAppURL(remoteUrl)}
              </UniversalLink>
            </p>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
      )}
    </Container>
  );
};

export default Sponsor;

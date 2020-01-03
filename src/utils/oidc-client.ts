import {
  Issuer,
  custom,
  Client
} from 'openid-client';

import IAuth0Settings from '../settings';
import OidcClientSettings from '../oidc-client-settings';

export interface IOidcClientFactory {
  (): Promise<Client>;
}

interface ClientSettings {
  timeout: number;
}

export default function getClient(settings: IAuth0Settings): IOidcClientFactory {
  let client: any = null;
  const clientSettings: OidcClientSettings = settings.oidcClient || {
    httpTimeout: 2500
  };

  return async (): Promise<Client> => {
    if (client) {
      return client;
    }

    const issuer = new Issuer({
      issuer: settings.issuer,
      authorization_endpoint: settings.authorizationUrl,
      token_endpoint: settings.tokenUrl,
      jwks_uri: settings.jwksUrl,
      userinfo_endpoint: settings.userInfoEndpoint
    });

    client = new issuer.Client({
      client_id: settings.clientId,
      client_secret: settings.clientSecret,
      redirect_uris: [settings.redirectUri],
      response_types: ['code']
    });

    client.authorizationUrl({
      scope: settings.scope,
      response_mode: 'form_post'
    })

    if (clientSettings.httpTimeout) {
      const timeout = clientSettings.httpTimeout;
      client[custom.http_options] = function setHttpOptions(options: ClientSettings): ClientSettings {
        return {
          ...options,
          timeout
        };
      };
    }

    if (clientSettings.clockTolerance) {
      client[custom.clock_tolerance] = clientSettings.clockTolerance / 1000;
    }

    return client;
  };
}

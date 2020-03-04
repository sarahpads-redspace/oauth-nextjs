import OidcClientSettings from './oidc-client-settings';
import { ICookieSessionStoreSettings } from './session/cookie-store/settings';
export default interface IAuth0Settings {
    /**
     * Auth0 Issuer
     */
    issuer: string;
    /**
     * URL user should be redirected to to sign in
     */
    authorizationUrl: string;
    /**
     * URL to get tokens from
     */
    tokenUrl: string;
    /**
     * URL to get JWKs from
     */
    jwksUrl: string;
    /**
     * URL to retrieve user information from
     */
    userInfoEndpoint: string;
    /**
     * URL user should be redirected to to log out
     */
    logoutUrl: string;
    /**
     * Client ID.
     */
    clientId: string;
    /**
     * Client secret.
     */
    clientSecret: string;
    /**
     * Url to redirect to after the user has signed in.
     */
    redirectUri: string;
    /**
     * URL to redirect to after the user has signed out.
     */
    postLogoutRedirectUri: string;
    /**
     * The scope requested by the client.
     */
    scope: string;
    /**
     * API Audience.
     */
    audience?: string;
    /**
     * Settings related to the session.
     */
    session: ICookieSessionStoreSettings;
    /**
     * Settings for the OIDC Client which performs the code exchange.
     */
    oidcClient?: OidcClientSettings;
    serializeUser: (user: any) => any;
}

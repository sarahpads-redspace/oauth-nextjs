"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const openid_client_1 = require("openid-client");
function getClient(settings) {
    let client = null;
    const clientSettings = settings.oidcClient || {
        httpTimeout: 2500
    };
    return () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (client) {
            return client;
        }
        const issuer = new openid_client_1.Issuer({
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
        });
        if (clientSettings.httpTimeout) {
            const timeout = clientSettings.httpTimeout;
            client[openid_client_1.custom.http_options] = function setHttpOptions(options) {
                return Object.assign(Object.assign({}, options), { timeout });
            };
        }
        if (clientSettings.clockTolerance) {
            client[openid_client_1.custom.clock_tolerance] = clientSettings.clockTolerance / 1000;
        }
        return client;
    });
}
exports.default = getClient;
//# sourceMappingURL=oidc-client.js.map
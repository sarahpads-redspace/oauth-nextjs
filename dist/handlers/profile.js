"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function profileHandler(clientProvider, sessionStore) {
    return (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!req) {
            throw new Error('Request is not available');
        }
        if (!res) {
            throw new Error('Response is not available');
        }
        const session = yield sessionStore.read(req);
        if (!session || !session.user || !session.accessToken) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }
        const client = yield clientProvider();
        const profile = yield client.userinfo(session.accessToken);
        res.json(profile);
    });
}
exports.default = profileHandler;
//# sourceMappingURL=profile.js.map
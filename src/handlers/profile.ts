import { NextApiResponse, NextApiRequest } from 'next';
import { IOidcClientFactory } from '../utils/oidc-client';
import { ISessionStore } from '../session/store';

export default function profileHandler(
  clientProvider: IOidcClientFactory,
  sessionStore: ISessionStore
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req) {
      throw new Error('Request is not available');
    }

    if (!res) {
      throw new Error('Response is not available');
    }

    const session = await sessionStore.read(req);
    if (!session || !session.user || !session.accessToken) {
      res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated'
      });
      return;
    }

    const client = await clientProvider();
    const profile = await client.userinfo(session.accessToken);

    res.json(profile);
  };
}

import { NextApiResponse, NextApiRequest } from 'next';
import { IOidcClientFactory } from '../utils/oidc-client';
import { ISessionStore } from '../session/store';
export default function profileHandler(clientProvider: IOidcClientFactory, sessionStore: ISessionStore): (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>;

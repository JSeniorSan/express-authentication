import { getUserBySessionToken } from '../db/users.js';
import { merge } from 'lodash';
export const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = await req.cookies['TEKAI-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        console.log(req);
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403);
        }
        merge(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

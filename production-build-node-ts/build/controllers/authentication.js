import { createUser, getUserByEmail } from '../db/users.js';
import { authentication, random } from '../helpers/index.js';
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const currentUser = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!currentUser) {
            return res.sendStatus(400);
        }
        const expectedHash = authentication(currentUser.authentication[0].salt, password);
        if (expectedHash !== currentUser.authentication[0].password) {
            return res.sendStatus(403);
        }
        const salt = random();
        currentUser.authentication[0].sessionToken = authentication(salt, currentUser._id.toString());
        await currentUser.save();
        res.cookie('TEKAI-AUTH', currentUser.authentication[0].sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        return res.status(200).json(currentUser).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    return;
};
export const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }
};

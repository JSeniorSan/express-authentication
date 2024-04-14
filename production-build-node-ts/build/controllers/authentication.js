import { createUser, getUserByEmail } from '../db/users.js';
import { authentication, random } from '../helpers/index.js';
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
        return res.sendStatus(200).json(user).end();
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
};

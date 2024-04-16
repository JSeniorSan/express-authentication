import { getUsers } from '../db/users.js';
export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

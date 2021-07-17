import fs from 'fs';
import { generateUsersDataPath, extractUsersData, hashPassword, verifyPassword, handleGetUserDataObject } from 'server/utils/userUtils'


async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let credentials = req.body;
            let isValid
            // get data from FsModules
            const filePath = generateUsersDataPath();
            const data = extractUsersData(filePath);
            let userDataObject = await handleGetUserDataObject(credentials.email, data)
            if (userDataObject) {
                isValid = await verifyPassword(credentials.password, userDataObject.password);
            }
            else {
                res.status(404).json({ message: "No user Found" });
            }
            if (isValid) {
                res.status(201).json({ message: 'User SignIn Successfully!',  nextJWT: "ThisIsHardCodedCustomJsonWebToken" });
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server Side Error" });
        }
    }
    else if (req.method === "GET") {
        const data = req.body

    }
    else if (req.method === "PUT") {
        const data = req.body;

        res.status(201).json({ message: "User Updated sucessfully", data: "dataBuffer" });
    }
}

export default handler;

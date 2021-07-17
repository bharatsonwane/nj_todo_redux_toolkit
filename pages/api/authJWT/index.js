import fs from 'fs';
import { generateUsersDataPath, extractUsersData, hashPassword } from 'server/utils/userUtils'


async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let newUserData = req.body;
            const hashedPassword = await hashPassword(newUserData.password);
            newUserData.password = hashedPassword
            // store that in a database or in a file
            const filePath = generateUsersDataPath();
            const data = extractUsersData(filePath);
            data.push(newUserData);
            fs.writeFileSync(filePath, JSON.stringify(data));
            res.status(201).json({ message: 'User Created Successfully!' });
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

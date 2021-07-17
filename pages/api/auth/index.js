import fs from 'fs';


async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        

        res.status(201).json({ message: "User Created sucessfully", data: "dataBuffer" });
    }
}

export default handler;

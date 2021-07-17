
async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // const data = req.body;


            res.status(201).json({ message: "task added sucessfully", data: "dataBuffer" });
        } catch (error) {

        }

    }
}

export default handler;


const puppeteer = require("puppeteer");

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const urlPdf = data.urlForPdf
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(urlPdf, { waitUntil: "networkidle2" });

            // Hide header on a first page.
            await page.addStyleTag({
                content: "@page:first {margin-top: 0;}"
            });

            const pdfVal = await page.pdf({
                path: "../hn.pdf",
                displayHeaderFooter: true,
                printBackground: true,
                // headerTemplate: puppeteerParams.headerTemplate,
                // footerTemplate: puppeteerParams.footerTemplate,
                // margin: puppeteerParams.margin
            });

            let buff = new Buffer(pdfVal);
            let dataBuffer = buff.toString('base64');

            await browser.close();

            res.status(201).json({ message: "connected to Puppetter", data: dataBuffer });
        } catch (error) {
            res.status(500).json({ message: "Server Side Error" });
        }

    }
}

export default handler;


import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    const { type, id } = req.query;

    if (!type || !id) {
        return res.status(400).send("Missing 'type' or 'id' parameter");
    }

    // Construct the deep link
    const deepLink = `shareai://app?type=${encodeURIComponent(type as string)}&id=${encodeURIComponent(id as string)}`;

    res.redirect(deepLink);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

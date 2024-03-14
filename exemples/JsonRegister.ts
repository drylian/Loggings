import express, { Request, Response } from "express";
import { Loggings } from "loggings";
import path from "path";
import fs from "fs";
const app = express();
const port = 3000;
const access = new Loggings("Requesters", "blue", {
    register_type: "json"
});

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get("/", (req: Request, res: Response) => {
    // Log the IP address of the requester
    access.log("IP Requester: " + req.ip);
    res.send("Hello, Loggings!");
});

app.get("/registers", (req: Request, res: Response) => {
    const locale = path.join(access.meta.register_dir, access.meta.controller_title, "Info")
    if (fs.existsSync(locale)) {
        return res.json(JSON.parse(fs.readFileSync(locale, "utf-8")))
    } else {
        return res.json({})
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4001;

app.use(cors({
    origin: [process.env.NODE_ENV === 'production' ? process.env.GATEWAY_HOST : "*"]
}));

app.get("/", (req, res) => res.json({ status: "ok" }));

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`User service is listening at PORT ${PORT}`);
    });
}).catch(err => console.error(err));
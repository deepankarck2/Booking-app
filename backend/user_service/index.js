const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database");
require("dotenv").config();

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cors({
    origin: [process.env.NODE_ENV === 'production' ? process.env.GATEWAY_HOST : "*"],
}));

app.use("/", routes);

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`User service is listening at PORT ${PORT}`);
    });
}).catch(err => console.error(err));
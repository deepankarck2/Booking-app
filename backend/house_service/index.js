const express = require('express');
const cors = require('cors');
const { initMongoDatabase } = require('./database');
const generateHouses = require('./database/generateHouses');
require("dotenv").config();

const routes = require("./routes");

const PORT = process.env.HOUSE_SERVICE_PORT || 4002;

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.GATEWAY_HOST],
}));

app.use("/", routes);

initMongoDatabase().then(() => {

    // if not in production, create dummy house entries
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Current environment is not production, generating dummy house entries`);
        generateHouses().then(() => {
            app.listen(PORT, () => {
                console.log(`House service listening on ${PORT}`);
            });
        }).catch(err => console.error(err));
    }

    else {
        app.listen(PORT, () => {
            console.log(`House service listening on ${PORT}`);
        });
    }

}).catch(err => console.error(err));
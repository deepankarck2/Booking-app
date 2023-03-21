const express = require("express");
const cors = require("cors");
const { initMongoDatabase, initAuthDatabase } = require("./database");
require("dotenv").config();

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "production" ? process.env.GATEWAY_HOST : "*",
    ],
  })
);

app.use("/", routes);

async function startServer() {
  try {
    // start the mongo database
    await initMongoDatabase();

    // start the auth database
    await initAuthDatabase();

    app.listen(PORT, () => console.log(`User service listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

startServer();

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/user_service");
const houseRoutes = require("./routes/house_service");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_HOST],
    credentials: true,
}));

app.use("/user", userRoutes);
app.use("/house", houseRoutes);

app.get("/", (req, res) => res.json({ status: "OK" }));

app.listen(PORT, () => {
    console.log(`Gateway is listening on PORT ${PORT}`);
});


const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/user_service");

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_HOST],
    credentials: true,
}));

app.use("/user", userRoutes);

app.get("/", (req, res) => res.json({ status: "OK" }));

app.listen(PORT, () => {
    console.log(`Gateway is listening on PORT ${PORT}`);
});


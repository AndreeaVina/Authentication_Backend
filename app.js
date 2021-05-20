require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
const userRouter = require("./api/users/user.router");

app.use(cors())
app.use(express.json());
app.use("/api/users", userRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port " + process.env.APP_PORT + "...");
});
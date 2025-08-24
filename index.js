const mongoose = require("mongoose");
const express = require("express")
const userRouter = require("./routes/users")
const adminRouter = require("./routes/admin")
const courseRouter = require("./routes/courses")
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
    await mongoose.connect(MONGO_URL);
    app.listen(3000, () => console.log("Listening on port 3000"));
}

main();

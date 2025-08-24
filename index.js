const express = require("express")
const userRouter = require("./routes/users")
const adminRouter = require("./routes/admin")
const courseRouter = require("./routes/courses")

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(3000)
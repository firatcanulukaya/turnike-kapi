const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express();

app.use(json())
app.use(cors())

const studentRoute = require("./routes/student.route");
const authRoute = require("./routes/auth.route");

app.use("/api/student", studentRoute);
app.use("/api/auth", authRoute);

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))
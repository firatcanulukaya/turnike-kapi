const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express();

app.use(json())
app.use(cors())

const authCheck = require("./middlewares/authCheck.middleware");

const studentRoute = require("./routes/student.route");
const authRoute = require("./routes/auth.route");
const covidTestRoute = require("./routes/covidTest.route");
const rfidRoute = require("./routes/rfidPass.route");

app.use("/api/student", authCheck, studentRoute);
app.use("/api/auth", authRoute);
app.use("/api/covid", covidTestRoute);
app.use("/api/pass", rfidRoute);

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))
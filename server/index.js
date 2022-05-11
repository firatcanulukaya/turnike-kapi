const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors());
app.use(json());
app.use(
    session({
        secret: "OSMANOREKMESLEKLISESI2022",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(function (req, res, next) {
    res.setHeader("X-Powered-By", "12-BT IT TEAM V1.0.0 - 2022");
    res.setHeader("*FiratcanUlukaya", "Web Developer");
    res.setHeader("*AzatYalcin", "Arduino Developer");
    res.setHeader("*BurakGurses", "Arduino Developer");
    next();
});

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
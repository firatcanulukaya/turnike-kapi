const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const app = express();

app.use(json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))
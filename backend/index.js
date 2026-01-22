const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require('dotenv').config()
app.use(cors());
const Connect_db = require("./configuration/db");
const mainroute = require("./middlewares/route");
app.use(express.json());

Connect_db();


app.use("/api/v1", mainroute);


app.listen(port, console.log(`Server is running on port ${port}`)  );

app.use(express.json());


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require('dotenv').config()

const corsOptions = {
  origin: [
    "https://payment-app.savitanshu.dev",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const Connect_db = require("./configuration/db");
const mainroute = require("./middlewares/route");
app.use(express.json());

Connect_db();


app.use("/api/v1", mainroute);


app.listen(port, console.log(`Server is running on port ${port}`));

app.use(express.json());


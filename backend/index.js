const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require('dotenv').config();

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

app.use(express.json());

const Connect_db = require("./configuration/db");
const mainroute = require("./middlewares/route");

Connect_db()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection FAILED:", err.message);
    process.exit(1);
  });

app.use("/api/v1", mainroute);

app.listen(port, () => console.log(`Server is running on port ${port}`));

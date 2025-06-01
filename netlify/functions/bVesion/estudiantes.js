const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();

const estudiantesroutes = require("../../backend/routes/estudiantesroutes.js");

const app = express();
app.use(cors());
app.use(express.json());

router.use("/estudiantes", estudiantesroutes);
app.use("/.netlify/functions", router);

module.exports.handler = serverless(app);

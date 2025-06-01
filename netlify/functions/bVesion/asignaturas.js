const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();

const asignaturasroutes = require("../../backend/routes/asignaturasroutes.js");

const app = express();
app.use(cors());
app.use(express.json());

router.use("/asignaturas", asignaturasroutes);
app.use("/.netlify/functions", router);

module.exports.handler = serverless(app);

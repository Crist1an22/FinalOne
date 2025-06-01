const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();

const departamentoroutes = require("../../backend/routes/departamentoroutes.js");

const app = express();
app.use(cors());
app.use(express.json());

router.use("/departamento", departamentoroutes);
app.use("/.netlify/functions", router);

module.exports.handler = serverless(app);

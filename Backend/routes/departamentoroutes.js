const express = require('express');
const router = express.Router();
const controller = require('../controllers/departamentocontroller');

// Solo GET y PUT porque es nomas es uno
router.get('/', controller.consultar);
router.put('/', controller.modificar);

module.exports = router;

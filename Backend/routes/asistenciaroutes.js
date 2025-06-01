const express = require('express');
const router = express.Router();
const controller = require('../controllers/asistenciacontroller');

router.get('/', controller.consultar);
router.post('/', controller.ingresar);
router.get('/:id', controller.consultarDetalle);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.borrar);

module.exports = router;

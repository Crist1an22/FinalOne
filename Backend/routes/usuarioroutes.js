const express = require('express');
const router = express.Router();
const { db } = require('../../netlify/functions/firebaseAdmin');

// 🟢 GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 🟡 GET: Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('usuarios').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
});

// Crear fnuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = req.body;
    const ref = await db.collection('usuarios').add(nuevoUsuario);
    res.status(201).json({ id: ref.id, ...nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Modificar usuario existente
router.put('/:id', async (req, res) => {
  try {
    const datos = req.body;
    await db.collection('usuarios').doc(req.params.id).update(datos);
    res.json({ id: req.params.id, ...datos });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('usuarios').doc(req.params.id).delete();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;

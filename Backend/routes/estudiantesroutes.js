const express = require("express");
const router = express.Router();
const { db } = require("../../netlify/functions/firebaseAdmin");

router.get("/", async (req, res) => {
    const snapshot = await db.collection("estudiantes").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
});

router.post("/", async (req, res) => {
    const estudiante = req.body;
    const ref = await db.collection("estudiantes").add(estudiante);
    res.json({ id: ref.id, ...estudiante });
});

module.exports = router;

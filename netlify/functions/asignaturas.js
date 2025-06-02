const { db } = require("./firebaseAdmin");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const { nombre, codigo, departamento } = data;

    if (!nombre || !codigo || !departamento) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios: nombre, código o departamento" }),
      };
    }

    // Verificar si ya existe una asignatura con ese código
    const snapshot = await db.collection("asignaturas").where("codigo", "==", codigo).get();

    if (!snapshot.empty) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "Ya existe una asignatura con ese código" }),
      };
    }

    // Guardar nueva asignatura
    await db.collection("asignaturas").add(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Asignatura registrada con éxito" }),
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};

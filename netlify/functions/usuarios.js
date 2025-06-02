const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    // POST - Agregar estudiante
    if (method === "POST") {
      const data = JSON.parse(event.body);

      // Validación EXACTA según frontend
      if (
        !data.tipoDocumento ||
        !data.numeroDocumento ||
        !data.nombres ||
        !data.apellidos ||
        !data.departamento
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" }),
        };
      }

      await db.collection("estudiantes").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Estudiante agregado con éxito" }),
      };
    }

    // GET - Listar estudiantes si hay ?listar=true
    if (method === "GET" && event.queryStringParameters?.listar === "true") {
      const snapshot = await db.collection("estudiantes").get();
      const estudiantes = snapshot.docs.map(doc => doc.data());

      return {
        statusCode: 200,
        body: JSON.stringify(estudiantes),
      };
    }

    // ❌ GET con ID (opcional si lo necesitas más adelante)
    if (method === "GET" && event.queryStringParameters?.id) {
      const doc = await db.collection("estudiantes").doc(event.queryStringParameters.id).get();

      if (!doc.exists) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Estudiante no encontrado" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(doc.data()),
      };
    }

    // 🚫 Método no permitido
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };

  } catch (error) {
    console.error(" Error en función usuarios:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};

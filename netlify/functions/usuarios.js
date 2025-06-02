
const { db } = require("./firebaseAdmin");

exports.handler = async (event, context) => {
  try {
    const method = event.httpMethod;

    if (method === "GET") {
      const userId = event.queryStringParameters?.id;
      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Falta el parámetro 'id'" }),
        };
      }

      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Usuario no encontrado: " + userId }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(userDoc.data()),
      };
    }

    // 📥 POST - Crear nuevo usuario
    if (method === "POST") {
      const data = JSON.parse(event.body);

      if (!data.nombre || !data.apellidos || !data.email || !data.dni) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" }),
        };
      }

      const ref = await db.collection("users").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Usuario agregado", id: ref.id }),
      };
    }

    // 🚫 Método no permitido
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };

  } catch (error) {
    console.error("🔥 Error en función usuarios:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};

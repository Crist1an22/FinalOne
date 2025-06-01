
const { db } = require("./firebaseAdmin");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === "GET") {
      const iden = event.queryStringParameters?.iden;
      if (!iden) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Falta el parámetro 'iden'" }),
        };
      }

      const userDoc = await db.collection("users").doc(iden).get();
      if (!userDoc.exists) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Usuario no encontrado: " + iden }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(userDoc.data()),
      };
    }

    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);
      if (!data.nombre || !data.apellidos || !data.email || !data.dni) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" }),
        };
      }

      await db.collection("users").add(data);

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Usuario agregado" }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};


const { db } = require("./firebaseAdmin");

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      if (!data.nombre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "El nombre del departamento es obligatorio" }),
        };
      }

      await db.collection("departamentos").add(data);

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Departamento registrado con éxito" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error interno del servidor" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Método no permitido" }),
  };
};

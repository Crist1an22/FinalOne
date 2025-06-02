const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      const { nombre } = JSON.parse(event.body);

      if (!nombre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Nombre requerido" }),
        };
      }

      await db.collection("departamentos").add({ nombre });

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Departamento registrado con éxito" }),
      };
    } catch (err) {
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

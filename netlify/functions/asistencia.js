
const { db } = require("./firebaseAdmin");

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      if (!data.fecha || !data.estudianteId || !data.asignaturaId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" }),
        };
      }

      await db.collection("asistencias").add({
        fecha: data.fecha,
        estudianteId: data.estudianteId,
        asignaturaId: data.asignaturaId
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Asistencia registrada con éxito" }),
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

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

    const { fecha, horaInicio, horaFinal, documento, estado } = data;

    if (!fecha || !horaInicio || !horaFinal || !documento || estado === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios" }),
      };
    }

    await db.collection("asistencias").add(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Asistencia registrada correctamente" }),
    };

  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};

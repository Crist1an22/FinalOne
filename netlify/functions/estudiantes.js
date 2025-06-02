const { db } = require('./firebaseAdmin');

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      const requiredFields = ["tipoDocumento", "numeroDocumento", "nombres", "apellidos", "programa", "semestre"];

      for (let field of requiredFields) {
        if (!data[field]) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: `Falta el campo: ${field}` }),
          };
        }
      }

      await db.collection("estudiantes").add(data);

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Estudiante registrado con éxito" }),
      };
    } catch (error) {
      console.error("Error al registrar estudiante:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al registrar estudiante" }),
      };
    }
  }

  if (event.httpMethod === "GET" && event.queryStringParameters.listar === "true") {
    try {
      const snapshot = await db.collection("estudiantes").get();
      const estudiantes = snapshot.docs.map(doc => doc.data());

      return {
        statusCode: 200,
        body: JSON.stringify(estudiantes),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al obtener estudiantes" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Método no permitido" }),
  };
};

const { db } = require('./firebaseAdmin');

exports.handler = async function(event, context) {
  try {
    // ejemplo: contar cuántos usuarios hay en la colección 'usuarios'
    const snapshot = await db.collection('usuarios').get();
    const total = snapshot.size;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Función webService activa',
        usuariosRegistrados: total
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al acceder a Firebase',
        detalle: error.message
      }),
    };
  }
};

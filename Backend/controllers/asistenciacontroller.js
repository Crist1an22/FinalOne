const asistenciaController = {
    consultar: (req, res) => {
        res.send("Consulta de asistencias");
    },
    ingresar: (req, res) => {
        res.send("Asistencia registrada");
    },
    consultarDetalle: (req, res) => {
        const id = req.params.id;
        res.send(`Detalles de asistencia con ID: ${id}`);
    },
    actualizar: (req, res) => {
        const id = req.params.id;
        res.send(`Asistencia ${id} actualizada`);
    },
    borrar: (req, res) => {
        const id = req.params.id;
        res.send(`Asistencia ${id} eliminada`);
    }
};

module.exports = asistenciaController;

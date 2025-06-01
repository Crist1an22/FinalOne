const asignaturaController = {
    consultar: (req, res) => {
        res.send("Consulta de asignaturas");
    },
    ingresar: (req, res) => {
        res.send("Asignatura registrada");
    },
    consultarDetalle: (req, res) => {
        const id = req.params.id;
        res.send(`Detalles de asignatura con ID: ${id}`);
    },
    actualizar: (req, res) => {
        const id = req.params.id;
        res.send(`Asignatura ${id} actualizada`);
    },
    borrar: (req, res) => {
        const id = req.params.id;
        res.send(`Asignatura ${id} eliminada`);
    }
};

module.exports = asignaturaController;

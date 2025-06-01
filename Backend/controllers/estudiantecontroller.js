const estudianteController = {
    consultar: (req, res) => {
        res.send("Consulta de estudiantes");
    },
    ingresar: (req, res) => {
        res.send("Estudiante registrado");
    },
    consultarDetalle: (req, res) => {
        const id = req.params.id;
        res.send(`Detalles del estudiante con ID: ${id}`);
    },
    actualizar: (req, res) => {
        const id = req.params.id;
        res.send(`Estudiante ${id} actualizado`);
    },
    borrar: (req, res) => {
        const id = req.params.id;
        res.send(`Estudiante ${id} eliminado`);
    }
};

module.exports = estudianteController;

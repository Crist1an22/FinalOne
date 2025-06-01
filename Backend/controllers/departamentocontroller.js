const departamentoController = {
    consultar: (req, res) => {
        res.send("Consulta de nombre del departamento");
    },
    modificar: (req, res) => {
        res.send("Nombre del departamento actualizado");
    }
};

module.exports = departamentoController;

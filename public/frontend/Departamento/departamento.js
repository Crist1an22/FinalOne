document.getElementById('form-departamento').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoNombre = document.getElementById('nuevoNombre').value;

    if (!nuevoNombre.trim()) {
        alert("Por favor, escribe un nombre válido para el departamento.");
        return;
    }

    const data = {
        nombre: nuevoNombre
    };

    fetch('/.netlify/functions/actualizarDepartamento', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
            if (response.mensaje) {
                alert("Departamento actualizado con éxito.");
                document.getElementById('nombreDepartamento').textContent = nuevoNombre;
                document.getElementById('form-departamento').reset();
            } else {
                alert("Error al actualizar: " + response.error);
            }
        })
        .catch(err => {
            console.error("Error al enviar datos:", err);
            alert("Ocurrió un error al guardar.");
        });
});

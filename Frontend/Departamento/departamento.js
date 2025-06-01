const nombreSpan = document.getElementById('nombreDepartamento');

function mostrarNombre() {
    const nombre = localStorage.getItem('departamento') || 'Ingeniería';
    nombreSpan.textContent = nombre;
}

document.getElementById('form-departamento').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevoNombre = document.getElementById('nuevoNombre').value;
    localStorage.setItem('departamento', nuevoNombre);
    mostrarNombre();
    alert("Nombre del departamento actualizado.");
});

document.addEventListener('DOMContentLoaded', mostrarNombre);

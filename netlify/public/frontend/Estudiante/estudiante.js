document.getElementById('form-estudiante').addEventListener('submit', function(e) {
    e.preventDefault();

    const estudiante = {
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        programa: document.getElementById('programa').value,
        semestre: document.getElementById('semestre').value
    };

    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    estudiantes.push(estudiante);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

    mostrarEstudiantes();
});

function mostrarEstudiantes() {
    const container = document.getElementById('estudiantes');
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];

    container.innerHTML = '';
    estudiantes.forEach(e => {
        container.innerHTML += `
            <p>${e.nombres} ${e.apellidos} - ${e.tipoDocumento}: ${e.numeroDocumento} | ${e.programa} - Semestre ${e.semestre}</p>
        `;
    });
}

document.addEventListener('DOMContentLoaded', mostrarEstudiantes);

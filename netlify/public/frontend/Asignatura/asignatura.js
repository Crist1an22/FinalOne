document.getElementById('form-asignatura').addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const grupo = document.getElementById('grupo').value;
    const semestre = document.getElementById('semestre').value;
    const nombre = document.getElementById('nombre').value;
    const creditos = document.getElementById('creditos').value;

    const asignatura = {
        codigo,
        grupo,
        semestre,
        nombre,
        creditos
    };

    let asignaturas = JSON.parse(localStorage.getItem('asignaturas')) || [];
    asignaturas.push(asignatura);
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));

    mostrarAsignaturas();
});

function mostrarAsignaturas() {
    const container = document.getElementById('asignaturas');
    const asignaturas = JSON.parse(localStorage.getItem('asignaturas')) || [];

    container.innerHTML = '';
    asignaturas.forEach((a, index) => {
        container.innerHTML += `
            <p>${a.codigo} - ${a.nombre} (${a.semestre}) | Créditos: ${a.creditos}</p>
        `;
    });
}

document.addEventListener('DOMContentLoaded', mostrarAsignaturas);

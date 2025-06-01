document.getElementById('form-asistencia').addEventListener('submit', function(e) {
    e.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFinal = document.getElementById('horaFinal').value;
    const documento = document.getElementById('documento').value;
    const estado = document.getElementById('estado').value;

    const registro = {
        fecha,
        horaInicio,
        horaFinal,
        documento,
        estado
    };

    let asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
    asistencias.push(registro);
    localStorage.setItem('asistencias', JSON.stringify(asistencias));

    mostrarAsistencias();
});

function mostrarAsistencias() {
    const container = document.getElementById('asistencias');
    const asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];

    container.innerHTML = '';
    asistencias.forEach((a) => {
        const estadoTexto = ["A tiempo", "Tarde", "No asistió"][parseInt(a.estado)];
        container.innerHTML += `
            <p>${a.fecha} | ${a.horaInicio} - ${a.horaFinal} | Doc: ${a.documento} | Estado: ${estadoTexto}</p>
        `;
    });
}

document.addEventListener('DOMContentLoaded', mostrarAsistencias);

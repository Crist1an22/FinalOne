document.getElementById('formulario-asignatura').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const asignatura = {
      codigo: document.getElementById('codigo').value,
      nombre: document.getElementById('nombre').value,
      grupo: document.getElementById('grupo').value,
      docente: document.getElementById('docente').value,
      semestre: document.getElementById('semestre').value
    };
  
    fetch("/.netlify/functions/agregarAsignatura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(asignatura)
    })
      .then(response => response.json())
      .then(data => {
        alert("Asignatura guardada exitosamente");
        document.getElementById('formulario-asignatura').reset();
      })
      .catch(error => {
        console.error("Error al guardar:", error);
        alert("Ocurrió un error al guardar");
      });
  });
  
document.getElementById("form-asistencia").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const asistencia = {
      fecha: document.getElementById("fecha").value,
      horaInicio: document.getElementById("horaInicio").value,
      horaFinal: document.getElementById("horaFinal").value,
      documento: document.getElementById("documento").value,
      estado: parseInt(document.getElementById("estado").value),
    };
  
    try {
      const response = await fetch("/.netlify/functions/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asistencia),
      });
  
      const resultado = await response.json();
  
      if (response.ok) {
        alert(resultado.mensaje);
        document.getElementById("form-asistencia").reset();
      } else {
        alert("Error: " + resultado.error);
      }
    } catch (err) {
      console.error("Error al registrar asistencia:", err);
      alert("Error al conectar con el servidor");
    }
  });
  
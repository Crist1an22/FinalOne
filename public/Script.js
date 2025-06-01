document.addEventListener('DOMContentLoaded', () => {
    console.log("%cBienvenido al Sistema Académico Web", "color: teal; font-size: 16px; font-weight: bold;");

    const links = document.querySelectorAll('.menu a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const modulo = link.textContent;
            const confirmar = confirm(`¿Deseas entrar al módulo de "${modulo}"?`);
            if (!confirmar) {
                e.preventDefault(); // evita que navegue si cancela
            } else {
                console.log(`Navegando a: ${modulo}`);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Alternador de tema oscuro
    const btnTheme = document.querySelector('#btn_cambio');
    const body = document.body;

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            body.classList.toggle('modo_oscuro');
        });
    }
});
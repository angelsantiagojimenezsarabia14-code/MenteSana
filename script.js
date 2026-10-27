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
const appointmentForm = document.querySelector('#appointmentForm');
    const formAlertContainer = document.querySelector('#formAlertContainer');
    const savedAppointmentsContainer = document.querySelector('#savedAppointmentsContainer');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita la recarga de página

            const nombre = document.querySelector('#nombreInput').value.trim();
            const email = document.querySelector('#emailInput').value.trim();
            const motivo = document.querySelector('#motivoSelect').value;
            const modalidadInput = document.querySelector('input[name="modalidadRadio"]:checked');
            const modalidad = modalidadInput ? modalidadInput.value : 'Online';
            const descripcion = document.querySelector('#descripcionTextarea').value.trim();

            if (!nombre || !email || !motivo || !descripcion) {
                formAlertContainer.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                        <strong>Campos incompletos:</strong> Por favor llena todos los campos marcados con asterisco (*).
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                return;
            }

            const nuevaCita = {
                id: Date.now(),
                nombre,
                email,
                motivo,
                modalidad,
                descripcion
            };

            guardarEnLocalStorage(nuevaCita);
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    // Modo Oscuro persistente
    const btnTheme = document.querySelector('#btn_cambio');
    const body = document.body;

    if (localStorage.getItem('theme_mode') === 'dark') {
        body.classList.add('modo_oscuro');
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            body.classList.toggle('modo_oscuro');
            if (body.classList.contains('modo_oscuro')) {
                localStorage.setItem('theme_mode', 'dark');
            } else {
                localStorage.setItem('theme_mode', 'light');
            }
        });
    }

    // Interceptación y validación avanzada del formulario
    const appointmentForm = document.querySelector('#appointmentForm');
    const formAlertContainer = document.querySelector('#formAlertContainer');
    const savedAppointmentsContainer = document.querySelector('#savedAppointmentsContainer');

    if (savedAppointmentsContainer) {
        renderSavedAppointments();
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombreInput = document.querySelector('#nombreInput');
            const emailInput = document.querySelector('#emailInput');
            const motivoSelect = document.querySelector('#motivoSelect');
            const descripcionTextarea = document.querySelector('#descripcionTextarea');
            const modalidadInput = document.querySelector('input[name="modalidadRadio"]:checked');

            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const motivo = motivoSelect.value;
            const modalidad = modalidadInput ? modalidadInput.value : 'Online';
            const descripcion = descripcionTextarea.value.trim();

            // Arreglo para identificar qué campos específicos faltan por llenar
            const camposFaltantes = [];

            if (!nombre) camposFaltantes.push('Nombre Completo');
            if (!email) camposFaltantes.push('Correo Electrónico');
            if (!motivo) camposFaltantes.push('Motivo de Consulta');
            if (!descripcion) camposFaltantes.push('Descripción del Motivo');

            // Si hay campos faltantes, muestra una alerta detallada con los campos requeridos
            if (camposFaltantes.length > 0) {
                formAlertContainer.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                        <strong><i class="fa-solid fa-triangle-exclamation me-2"></i>Por favor completa los siguientes apartados requeridos:</strong>
                        <ul class="mb-0 mt-2">
                            ${camposFaltantes.map(campo => `<li>${campo}</li>`).join('')}
                        </ul>
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

            formAlertContainer.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show mb-3" role="alert">
                    <strong>¡Solicitud de Turno Exitosa!</strong> Se ha registrado la pre-consulta para ${nombre}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¡Resumen del Turno!',
                    html: `
                        <div class="text-start">
                            <p><strong>Paciente:</strong> ${nombre}</p>
                            <p><strong>Motivo:</strong> ${motivo}</p>
                            <p><strong>Modalidad:</strong> ${modalidad}</p>
                            <p><strong>Correo:</strong> ${email}</p>
                        </div>
                    `,
                    icon: 'success',
                    confirmButtonText: 'Entendido y Confirmar',
                    confirmButtonColor: '#10b981'
                });
            }

            appointmentForm.reset();
            renderSavedAppointments();
        });
    }

    function guardarEnLocalStorage(cita) {
        let citas = JSON.parse(localStorage.getItem('citas_mentesana')) || [];
        citas.push(cita);
        localStorage.setItem('citas_mentesana', JSON.stringify(citas));
    }

    function renderSavedAppointments() {
        let citas = JSON.parse(localStorage.getItem('citas_mentesana')) || [];
        if (!savedAppointmentsContainer) return;

        if (citas.length === 0) {
            savedAppointmentsContainer.innerHTML = '<p class="text-muted">No hay citas registradas en este dispositivo.</p>';
            return;
        }

        savedAppointmentsContainer.innerHTML = citas.map((c) => `
            <div class="card mb-3 border-0 shadow-sm p-3 bg-white">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="text-success fs-6">${c.nombre}</strong>
                    <span class="badge bg-success">${c.modalidad}</span>
                </div>
                <small class="text-muted"><strong>Motivo:</strong> ${c.motivo} | <strong>Correo:</strong> ${c.email}</small>
                <p class="mb-0 mt-2 text-secondary small">${c.descripcion}</p>
            </div>
        `).join('');
    }
});
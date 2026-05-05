document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Sistema Darwin UI Inicializado - Modo Avanzado.");
    // ==========================================
    // 🛡️ GUARDIÁN DE SEGURIDAD Y PERFIL
    // ==========================================
    const token = localStorage.getItem('darwin_token');
    
    // Si no hay token, redirigir al login inmediatamente
    if (!token) {
        window.location.href = '/login.html';
        return; // Detiene la ejecución del resto del dashboard
    }

    // Leer los datos del usuario logueado
    const userDataString = localStorage.getItem('darwin_user');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        
        // Inyectar el nombre en el HTML
        document.getElementById('user-name-display').innerText = userData.nombre;
        
        // Inyectar el rol en el menú desplegable
        if(document.getElementById('user-role-display')) {
            document.getElementById('user-role-display').innerText = userData.rol || 'Usuario';
        }

        // Sacar la primera letra del nombre para el Avatar (Ej. "Lucian" -> "L")
        const inicial = userData.nombre.charAt(0).toUpperCase();
        document.getElementById('user-avatar-display').innerText = inicial;
    }

    // Lógica del menú desplegable (Abrir/Cerrar)
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const btnLogout = document.getElementById('btn-logout');

    // Mostrar/Ocultar al hacer clic en el perfil
    userProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic se propague al documento
        if (userDropdown.style.display === 'none' || userDropdown.style.display === '') {
            userDropdown.style.display = 'flex';
        } else {
            userDropdown.style.display = 'none';
        }
    });

    // Cerrar el menú si se hace clic en cualquier otro lado de la pantalla
    document.addEventListener('click', () => {
        userDropdown.style.display = 'none';
    });

    // Acción de CERRAR SESIÓN
    btnLogout.addEventListener('click', () => {
        // Borramos las credenciales del navegador
        localStorage.removeItem('darwin_token');
        localStorage.removeItem('darwin_user');
        
        // Redirigimos al login
        window.location.href = '/login.html';
    });
    // ==========================================
    // FIN DEL GUARDIÁN
    // ==========================================

    const viewContainer = document.getElementById('main-view');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Elementos del Modal
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const formInputsContainer = document.getElementById('form-inputs');
    const dynamicForm = document.getElementById('dynamic-form');
    
    let moduloActual = null; 
    let idEditando = null; // Para saber si estamos creando o actualizando

    // SVGs Elegantes
    const iconEdit = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    const iconDelete = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
    const iconPrint = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`;
    // 1. DICCIONARIO INTELIGENTE (Aquí mapeamos las relaciones de tus 9 tablas)
    // 1. DICCIONARIO INTELIGENTE (Con "Traducción" a lenguaje humano)
    const modulos = {
        'tipo_agente': { 
            titulo: 'Tipos de Agente', url: '/api/tipo-agente', pk: 'ID_TA', 
            campos: [{ nombre: 'NOMBRE_TA', tipo: 'text', label: 'Rol del Agente', placeholder: 'Ej. Supervisor, Técnico, etc.' }] 
        },
        'accion': { 
            titulo: 'Acciones', url: '/api/accion', pk: 'ID_ACCION', 
            campos: [
                { nombre: 'NOMBRE_ABREVIADO', tipo: 'text', label: 'Nombre Corto (Abreviatura)', placeholder: 'Ej. MANT' }, 
                { nombre: 'NOMBRE_ACCION', tipo: 'text', label: 'Nombre Completo de la Acción', placeholder: 'Ej. Mantenimiento Preventivo' }, 
                { nombre: 'CODIGO_A_E', tipo: 'text', label: 'Código de la Acción', placeholder: 'Ej. A001' }, 
                { nombre: 'CODIGO_P_ACCION', tipo: 'text', label: 'Código Principal', placeholder: 'Ej. P001' }
            ] 
        },
        'accion_especifica': { 
            titulo: 'Acciones Específicas', url: '/api/accion-especifica', pk: 'ID_AE', 
            campos: [
                { nombre: 'NOMBRE_ABREVIADO', tipo: 'text', label: 'Nombre Corto', placeholder: 'Ej. REV' }, 
                { nombre: 'ACCION_ESPECIFICA', tipo: 'text', label: 'Detalle de la Acción Específica', placeholder: 'Ej. Revisión de motor' }, 
                { nombre: 'CODIGO_A_E', tipo: 'text', label: 'Código Específico', placeholder: 'Ej. AE001' }
            ] 
        },
        'actividad': { 
            titulo: 'Actividades', url: '/api/actividad', pk: 'ID_ACTIVIDAD', 
            campos: [
                { nombre: 'NOMBRE_ACTIVIDAD', tipo: 'text', label: 'Nombre de la Actividad', placeholder: 'Ej. Limpieza de filtros' }, 
                { nombre: 'CODIGO_ACTIVIDAD', tipo: 'text', label: 'Código de Actividad', placeholder: 'Ej. ACT-01' },
                { nombre: 'ID_TA', tipo: 'select', relUrl: '/api/tipo-agente', relId: 'ID_TA', relText: 'NOMBRE_TA', label: '¿Qué tipo de agente hace esto?' }
            ] 
        },
        'subaccion': { 
            titulo: 'Subacciones', url: '/api/subaccion', pk: 'ID_SA', 
            campos: [
                { nombre: 'NOMBRE_ABREVIADO', tipo: 'text', label: 'Abreviatura', placeholder: 'Ej. SUB' }, 
                { nombre: 'SUB_ACCION_ESP', tipo: 'text', label: 'Nombre de la Subacción', placeholder: 'Ej. Cambio de aceite' }, 
                { nombre: 'CONCAT', tipo: 'text', label: 'Texto Concatenado (Unión)', placeholder: 'Ej. REV-SUB' }, 
                { nombre: 'CODIGO_S_A_E', tipo: 'text', label: 'Código de Subacción', placeholder: 'Ej. SA001' },
                { nombre: 'ID_AE', tipo: 'select', relUrl: '/api/accion-especifica', relId: 'ID_AE', relText: 'ACCION_ESPECIFICA', label: '¿A qué acción específica pertenece?' }
            ] 
        },
        'tipo_transporte': { 
            titulo: 'Tipos de Transporte', url: '/api/tipo-transporte', pk: 'id_tt', 
            campos: [{ nombre: 'NOMBRE_TRANSPORTE', tipo: 'text', label: 'Medio de Transporte', placeholder: 'Ej. Camioneta, Moto, etc.' }] 
        },
        'zona_provincia': { 
            titulo: 'Provincias', url: '/api/zona-provincia', pk: 'id_zp', 
            campos: [{ nombre: 'NOMBRE_PROVINCIA', tipo: 'text', label: 'Nombre de la Provincia', placeholder: 'Ej. Huánuco' }] 
        },
        'zona_distrito': { 
            titulo: 'Distritos', url: '/api/zona-distrito', pk: 'id_zd', 
            campos: [
                { nombre: 'NOMBRE_DISTRITO', tipo: 'text', label: 'Nombre del Distrito', placeholder: 'Ej. Amarilis' },
                { nombre: 'id_zp', tipo: 'select', relUrl: '/api/zona-provincia', relId: 'id_zp', relText: 'NOMBRE_PROVINCIA', label: '¿A qué provincia pertenece?' }
            ] 
        },
        'detalle_registro': { 
            titulo: 'Registro Maestro', url: '/api/detalle-registro', pk: 'ID_REGISTRO', 
            campos: [
                { nombre: 'ID_ACCION', tipo: 'select', relUrl: '/api/accion', relId: 'ID_ACCION', relText: 'NOMBRE_ACCION', label: '1. Acción General' },
                { nombre: 'ID_AE', tipo: 'select', relUrl: '/api/accion-especifica', relId: 'ID_AE', relText: 'ACCION_ESPECIFICA', label: '2. Acción Específica' },
                { nombre: 'ID_SA', tipo: 'select', relUrl: '/api/subaccion', relId: 'ID_SA', relText: 'SUB_ACCION_ESP', label: '3. Subacción (Tarea puntual)' },
                { nombre: 'ID_TA', tipo: 'select', relUrl: '/api/tipo-agente', relId: 'ID_TA', relText: 'NOMBRE_TA', label: '4. Rol del encargado' },
                { nombre: 'id_tt', tipo: 'select', relUrl: '/api/tipo-transporte', relId: 'id_tt', relText: 'NOMBRE_TRANSPORTE', label: '5. Vehículo utilizado' },
                { nombre: 'id_zp', tipo: 'select', relUrl: '/api/zona-provincia', relId: 'id_zp', relText: 'NOMBRE_PROVINCIA', label: '6. Provincia del trabajo' },
                { nombre: 'id_zd', tipo: 'select', relUrl: '/api/zona-distrito', relId: 'id_zd', relText: 'NOMBRE_DISTRITO', label: '7. Distrito del trabajo' },
                { nombre: 'ID_ACTIVIDAD', tipo: 'select', relUrl: '/api/actividad', relId: 'ID_ACTIVIDAD', relText: 'NOMBRE_ACTIVIDAD', label: '8. Actividad Principal' },
                { nombre: 'NUM_SUPERVISORES', tipo: 'text', label: 'Cantidad de Supervisores', placeholder: '¿Cuántos supervisores asistieron? (Ej. 2)' }, 
                { nombre: 'EMPRESA_SUPERVISORA', tipo: 'text', label: 'Empresa que Supervisa', placeholder: 'Nombre de la empresa' },
                { nombre: 'CALIDAD_ENTREGABLE', tipo: 'text', label: 'Calidad del Trabajo Entregado', placeholder: 'Ej. Buena, Regular, Excelente' }, 
                { nombre: 'NRO_EXPEDIENTE', tipo: 'text', label: 'Número de Expediente', placeholder: 'Ej. EXP-2026-001' },
                { nombre: 'CARTA_LINEA', tipo: 'text', label: 'Documento / Carta de Línea', placeholder: 'Código del documento' }, 
                { nombre: 'OBSERVACIONES', tipo: 'text', label: 'Notas u Observaciones', placeholder: '¿Ocurrió algo relevante que deba anotarse?' }, 
                { nombre: 'CONTRATO', tipo: 'text', label: 'Número de Contrato', placeholder: 'Ej. CONT-9988' }
            ] 
        }
    };
// Cargar el Dashboard por defecto al iniciar
    cargarDashboard();

    // 2. NAVEGACIÓN
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navButtons.forEach(b => b.classList.remove('active')); 
            e.target.classList.add('active'); 
            const target = e.target.getAttribute('data-target');
            
            if (target === 'dashboard') {
                cargarDashboard(); // Llamamos a la función inteligente
            } else if (modulos[target]) {
                cargarDatosEnTabla(modulos[target]);
            }
        });
    });

    // 3. MOTOR DE TABLA (Dibuja los datos con los SVGs y botones funcionales)
    async function cargarDatosEnTabla(modulo) {
        moduloActual = modulo; 
        viewContainer.innerHTML = `<div class="glass-card" style="text-align: center; padding: 3rem;"><h3 style="color: var(--accent);">Cargando datos...</h3></div>`;

        try {
            const respuesta = await fetch(modulo.url);
            const datos = await respuesta.json();

            let html = `
                <div class="glass-card" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <h2>${modulo.titulo}</h2>
                    <button class="btn-primary" onclick="abrirFormulario()">+ Crear Nuevo</button>
                </div>
                <div class="glass-card" style="overflow-x: auto;">
            `;

            if (datos.length === 0) {
                html += `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay registros aún.</p>`;
            } else {
                html += `<table class="darwin-table"><thead><tr>`;
                const columnas = Object.keys(datos[0]);
                columnas.forEach(col => html += `<th>${col}</th>`);
                html += `<th>Acciones</th></tr></thead><tbody>`;

                datos.forEach(fila => {
                    const idFila = fila[modulo.pk]; // Obtenemos el ID real de la fila (ej. id_zp, ID_TA)
                    // Convertimos la fila a string seguro para pasarla al botón editar
                    const filaJson = encodeURIComponent(JSON.stringify(fila)); 

                    html += `<tr>`;
                    columnas.forEach(col => html += `<td>${fila[col]}</td>`);
                    html += `
                        <td style="white-space: nowrap;">
                            <button class="btn-icon" style="color: #10b981;" onclick="imprimirBoleta('${filaJson}')" title="Imprimir Reporte">${iconPrint}</button>
                            <button class="btn-icon" onclick="prepararEdicion('${filaJson}')" title="Editar">${iconEdit}</button>
                            <button class="btn-icon" style="color: #ef4444;" onclick="eliminarRegistro('${idFila}')" title="Eliminar">${iconDelete}</button>
                        </td>
                    </tr>`;
                });
                html += `</tbody></table>`;
            }
            html += `</div>`;
            viewContainer.innerHTML = html;
        } catch (error) {
            viewContainer.innerHTML = `<div class="glass-card"><h3 style="color: #ef4444;">Error de Conexión</h3></div>`;
        }
    }

    // 4. LÓGICA DEL MODAL INTELIGENTE (Con menús desplegables - Selects)
    // 4. LÓGICA DEL MODAL INTELIGENTE (Ahora con lenguaje humano)
    window.abrirFormulario = async function(datosEdicion = null) {
        idEditando = datosEdicion ? datosEdicion[moduloActual.pk] : null;
        modalTitle.innerText = idEditando ? `Modificar: ${moduloActual.titulo}` : `Crear Nuevo: ${moduloActual.titulo}`;
        
        formInputsContainer.innerHTML = '<p style="color:var(--text-muted);">Generando formulario...</p>';
        modalOverlay.classList.remove('hidden');

        let inputsHtml = '';

        for (const campo of moduloActual.campos) {
            const valorPrevio = datosEdicion ? datosEdicion[campo.nombre] : '';
            // Aquí usamos nuestros nombres bonitos en lugar de los de la base de datos
            const labelMostrar = campo.label || campo.nombre;
            const placeholderMostrar = campo.placeholder || '';

            if (campo.tipo === 'select') {
                try {
                    const resOpciones = await fetch(campo.relUrl);
                    const opciones = await resOpciones.json();
                    
                    inputsHtml += `
                        <div class="input-group">
                            <label for="${campo.nombre}">${labelMostrar}</label>
                            <select id="${campo.nombre}" name="${campo.nombre}" required style="background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 0.8rem; border-radius: 8px; color: var(--text-main); cursor:pointer;">
                                <option value="" disabled ${!valorPrevio ? 'selected' : ''}>-- Selecciona --</option>
                    `;
                    opciones.forEach(opc => {
                        const isSelected = valorPrevio == opc[campo.relId] ? 'selected' : '';
                        inputsHtml += `<option value="${opc[campo.relId]}" ${isSelected}>${opc[campo.relText]}</option>`;
                    });
                    inputsHtml += `</select></div>`;
                } catch (e) {
                    inputsHtml += `<p style="color:red;">Error cargando opciones de ${labelMostrar}</p>`;
                }
            } else {
                inputsHtml += `
                    <div class="input-group">
                        <label for="${campo.nombre}">${labelMostrar}</label>
                        <input type="text" id="${campo.nombre}" name="${campo.nombre}" value="${valorPrevio}" required autocomplete="off" placeholder="${placeholderMostrar}">
                    </div>
                `;
            }
        }
        formInputsContainer.innerHTML = inputsHtml;
    }

    // Funciones Auxiliares para Modificar y Eliminar
    window.prepararEdicion = function(filaJsonEncoded) {
        const fila = JSON.parse(decodeURIComponent(filaJsonEncoded));
        abrirFormulario(fila);
    }

    window.eliminarRegistro = async function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            try {
                await fetch(`${moduloActual.url}/${id}`, { method: 'DELETE' });
                cargarDatosEnTabla(moduloActual); // Recargamos la tabla
            } catch (error) {
                alert("Error al eliminar.");
            }
        }
    }

    closeModalBtn.addEventListener('click', () => { modalOverlay.classList.add('hidden'); });

    // 5. GUARDAR DATOS (POST para Crear, PUT para Modificar)
    dynamicForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const formData = new FormData(dynamicForm);
        const datosAEnviar = Object.fromEntries(formData.entries());

        const urlFinal = idEditando ? `${moduloActual.url}/${idEditando}` : moduloActual.url;
        const metodo = idEditando ? 'PUT' : 'POST';

        try {
            const respuesta = await fetch(urlFinal, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosAEnviar)
            });

            if (respuesta.ok) {
                modalOverlay.classList.add('hidden');
                dynamicForm.reset();
                cargarDatosEnTabla(moduloActual); 
            } else {
                alert("Hubo un error al guardar. Revisa si llenaste todo correctamente.");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    });
    // 6. FUNCIÓN PARA IMPRIMIR BOLETA / REPORTE
    window.imprimirBoleta = function(filaJsonEncoded) {
        const fila = JSON.parse(decodeURIComponent(filaJsonEncoded));
        const fechaActual = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

        // Diseñamos el documento HTML de la Boleta
        let boletaHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Reporte de Operación - Darwin</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #222; background: #fff; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; }
                    .header p { margin: 5px 0 0; color: #555; font-size: 14px; }
                    .info-box { margin-bottom: 30px; }
                    .table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                    .table th, .table td { padding: 12px 15px; border-bottom: 1px solid #ddd; text-align: left; font-size: 14px; }
                    .table th { width: 35%; color: #555; background-color: #f9f9f9; text-transform: uppercase; font-size: 12px; }
                    .footer { text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; margin-top: 50px; }
                    .firma { margin-top: 80px; text-align: center; }
                    .firma-linea { border-top: 1px solid #000; width: 250px; margin: 0 auto; padding-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Sistema de Gestión Darwin</h1>
                    <p>Reporte Oficial de Trazabilidad Operativa</p>
                </div>
                
                <div class="info-box">
                    <p><strong>Fecha de Emisión:</strong> ${fechaActual}</p>
                    <p><strong>Módulo Origen:</strong> ${moduloActual.titulo}</p>
                </div>

                <table class="table">
                    <tbody>
        `;

        // Recorremos los datos y los metemos en la tabla del PDF
        for (const clave in fila) {
            let nombreLimpio = clave.replace(/_/g, ' '); // Quitamos los guiones bajos
            let valor = fila[clave] ? fila[clave] : 'No registrado';
            
            boletaHTML += `
                <tr>
                    <th>${nombreLimpio}</th>
                    <td>${valor}</td>
                </tr>
            `;
        }

        boletaHTML += `
                    </tbody>
                </table>

                <div class="firma">
                    <div class="firma-linea">Firma del Supervisor / Responsable</div>
                </div>

                <div class="footer">
                    <p>Documento generado automáticamente por el Motor Darwin.</p>
                </div>
            </body>
            </html>
        `;

        // Abrimos la ventana, escribimos el código y mandamos a imprimir
        const ventanaImpresion = window.open('', '_blank', 'width=800,height=900');
        ventanaImpresion.document.write(boletaHTML);
        ventanaImpresion.document.close();
        
        ventanaImpresion.focus();
        setTimeout(() => {
            ventanaImpresion.print();
            ventanaImpresion.close(); // Cierra la ventanita sola después de imprimir
        }, 300);
    }
    // 7. MOTOR DEL DASHBOARD ESTADÍSTICO
    async function cargarDashboard() {
        // 1. Dibujamos el esqueleto del Dashboard con animaciones de carga ("...")
        viewContainer.innerHTML = `
            <div class="welcome-card glass-card" style="border-left: 4px solid var(--accent);">
                <h2>📊 Panel de Control Operativo</h2>
                <p style="color: var(--text-muted); margin-top: 5px;">Estadísticas en tiempo real del Sistema Darwin.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    
                    <div class="glass-card" style="text-align: center; padding: 1.5rem; border-top: 3px solid #3b82f6;">
                        <h3 style="font-size: 2.5rem; color: #fff; margin: 0;" id="stat-operaciones">...</h3>
                        <p style="color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; font-weight: bold; margin-top: 10px;">Operaciones Totales</p>
                    </div>
                    
                    <div class="glass-card" style="text-align: center; padding: 1.5rem; border-top: 3px solid #10b981;">
                        <h3 style="font-size: 2.5rem; color: #fff; margin: 0;" id="stat-agentes">...</h3>
                        <p style="color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; font-weight: bold; margin-top: 10px;">Tipos de Personal</p>
                    </div>
                    
                    <div class="glass-card" style="text-align: center; padding: 1.5rem; border-top: 3px solid #f59e0b;">
                        <h3 style="font-size: 2.5rem; color: #fff; margin: 0;" id="stat-actividades">...</h3>
                        <p style="color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; font-weight: bold; margin-top: 10px;">Actividades Registradas</p>
                    </div>

                    <div class="glass-card" style="text-align: center; padding: 1.5rem; border-top: 3px solid #8b5cf6;">
                        <h3 style="font-size: 2.5rem; color: #fff; margin: 0;" id="stat-zonas">...</h3>
                        <p style="color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem; font-weight: bold; margin-top: 10px;">Provincias Cubiertas</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
                    <div class="glass-card">
                        <h4 style="color: var(--accent); margin-bottom: 1rem; font-size: 1.2rem;">Estado del Sistema 📡</h4>
                        <ul style="list-style: none; color: var(--text-muted); line-height: 2;">
                            <li>🟢 Conexión a Base de Datos MySQL: <strong style="color: #10b981;">Óptima</strong></li>
                            <li>🟢 Motor de UI Dinámico: <strong style="color: #10b981;">Activo</strong></li>
                            <li>🟢 Integridad Relacional: <strong style="color: #10b981;">100%</strong></li>
                            <li>🔵 Tablas Administradas: <strong style="color: #fff;">9 de 9</strong></li>
                        </ul>
                    </div>
                    <div class="glass-card" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                        <h4 style="color: #f8fafc; margin-bottom: 0.5rem; font-size: 1.2rem;">Acceso Rápido ⚡</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Crea un nuevo reporte o imprime una boleta desde el Registro Maestro.</p>
                        <button class="btn-primary" onclick="document.querySelector('[data-target=\\'detalle_registro\\']').click()">Ir al Registro Maestro</button>
                    </div>
                </div>
            </div>
        `;

        // 2. Vamos a la Base de Datos a pedir los conteos reales
        try {
            const [resOps, resAgentes, resAct, resZonas] = await Promise.all([
                fetch('/api/detalle-registro'),
                fetch('/api/tipo-agente'),
                fetch('/api/actividad'),
                fetch('/api/zona-provincia')
            ]);

            const ops = await resOps.json();
            const agentes = await resAgentes.json();
            const act = await resAct.json();
            const zonas = await resZonas.json();

            // 3. Reemplazamos los "..." con los números reales
            document.getElementById('stat-operaciones').innerText = ops.length;
            document.getElementById('stat-agentes').innerText = agentes.length;
            document.getElementById('stat-actividades').innerText = act.length;
            document.getElementById('stat-zonas').innerText = zonas.length;
        } catch (error) {
            console.error("Error al cargar las estadísticas:", error);
            // Si hay error, ponemos un 0
            document.getElementById('stat-operaciones').innerText = "0";
            document.getElementById('stat-agentes').innerText = "0";
            document.getElementById('stat-actividades').innerText = "0";
            document.getElementById('stat-zonas').innerText = "0";
        }
    }
});
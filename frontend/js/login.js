// frontend/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const btnShowRegister = document.getElementById('btn-show-register');
    const btnShowLogin = document.getElementById('btn-show-login');

    // Alternar entre Login y Registro
    btnShowRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
    });

    btnShowLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
    });

    // Lógica para Iniciar Sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardamos el token y el nombre en el navegador
                localStorage.setItem('darwin_token', data.token);
                localStorage.setItem('darwin_user', JSON.stringify(data.user));
                
                // Redirigir al dashboard principal
                window.location.href = '/index.html'; 
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al conectar con el servidor.');
        }
    });

    // Lógica para Registrarse
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre_completo = document.getElementById('reg-nombre').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_completo, username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
                // Volver a mostrar el login
                registerForm.classList.add('hidden-form');
                loginForm.classList.remove('hidden-form');
                registerForm.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al conectar con el servidor.');
        }
    });
});
export default function Login() {
  // Popup logic (same as signup)
  function showPopup(message, type = 'error') {
    let popup = document.getElementById('popup-message');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'popup-message';
      document.body.appendChild(popup);
    }
    popup.className = `popup-message popup-${type} popup-show`;
    popup.textContent = message;
    clearTimeout(popup._timeout);
    popup._timeout = setTimeout(() => {
      popup.classList.remove('popup-show');
    }, 3000);
  }

  function showError(message) {
    showPopup(message, 'error');
  }
  function showSuccess(message) {
    showPopup(message, 'success');
  }

  // Función para manejar el login
  const handleLogin = async (email, password) => {
    // Validaciones básicas
    if (!email || !password) {
      showError('Por favor, completa todos los campos.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password })
      });
      const data = await response.json();
      if (!response.ok) {
        showError(data.message || 'Credenciales incorrectas.');
      } else {
        // Guarda el token en localStorage
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token);
        }
        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/taskpage';
        }, 2000);
      }
    } catch (err) {
      showError('No se pudo conectar con el servidor.');
    }
  };

  // Configurar event listeners después de que el DOM esté listo
  setTimeout(() => {
    const form = document.querySelector('.form_inputs');
    const submitBtn = document.querySelector('.submit_button input[type="submit"]');
    if (submitBtn && form) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;
        await handleLogin(email, password);
      });
    }
  }, 0);

  return `
    <main class="login_main">
      <div class="div_form">
        <h1>
          Iniciar sesión
        </h1>
        <form class="form_inputs" action="/submit" method="POST">
            <label class="label label-required">Correo</label>
            <input type="email" name="email" placeholder="ejemplo@gmail.com" class="input">
            <label class="label label-required">Contraseña</label>
            <input type="password" name="password" placeholder="*******" class="input">
        </form>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        <div class="submit_button">
          <input type="submit" class="btn btn-primary btn-block" value="Acceder">
        </div>
        <a href="/signup">Crear una cuenta</a>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" class="logo" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="/sitemap">Sitemap</a> 
    </footer>
    </main>
  `;
}
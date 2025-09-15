export default function Login() {
  // Función para manejar el login
  const handleLogin = async (email, password) => {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    // Limpiar mensajes anteriores
    if (errorDiv) {
      errorDiv.textContent = '';
      errorDiv.style.display = 'none';
    }
    if (successDiv) {
      successDiv.textContent = '';
      successDiv.style.display = 'none';
    }

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

  // Funciones auxiliares para mostrar mensajes
  const showError = (message) => {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'error-message';
      errorDiv.className = 'message message-error';
      const form = document.querySelector('.auth-form');
      form.parentNode.insertBefore(errorDiv, form.nextSibling);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  };

  const showSuccess = (message) => {
    let successDiv = document.getElementById('success-message');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.id = 'success-message';
      successDiv.className = 'message message-success';
      const form = document.querySelector('.auth-form');
      form.parentNode.insertBefore(successDiv, form.nextSibling);
    }
    successDiv.textContent = message;
    successDiv.style.display = 'block';
  };

  // Configurar event listeners después de que el DOM esté listo
  setTimeout(() => {
    const form = document.querySelector('.auth-form');
    const submitBtn = document.querySelector('button[type="submit"]');
    
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
<<<<<<< Updated upstream
    <div class="auth-container">
        <div class="auth-card">
            <!-- Form Section -->
            <div class="auth-form-section">
                <div class="auth-form-content">
                    <h1 class="auth-title">Iniciar Sesión</h1>
                    <p class="auth-subtitle">Bienvenido de vuelta</p>
                    
                    <form class="auth-form">
                        <div class="form-group">
                            <label class="label label-required">Email</label>
                            <input type="email" name="email" class="input" placeholder="tu@email.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="label label-required">Contraseña</label>
                            <input type="password" name="password" class="input" placeholder="••••••••" required>
                        </div>
                        
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" class="checkbox">
                                Recordarme
                            </label>
                            <a href="/forgot-password" class="forgot-link">¿Olvidaste tu contraseña?</a>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
                        
                        <div class="auth-switch">
                            <span>¿No tienes cuenta?</span>
                            <a href="/signup">Regístrate</a>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Logo Section -->
            <div class="auth-logo-section">
                <div class="auth-logo-content">
                    <div class="logo-container">
                        <div class="auth-logo-text">
                            <div class="logo-main">ToDo</div>
                            <div class="logo-sub">CENTER</div>
                        </div>
                    </div>
                    <h2 class="logo-title">Gestión de Tareas</h2>
                    <p class="logo-description">Organiza tu día, aumenta tu productividad y alcanza tus objetivos</p>
                </div>
            </div>
        </div>
    </div>
=======
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
        <img src="public/images/logo.png" class="logo" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="/sitemap">Sitemap</a> 
    </footer>
    </main>
>>>>>>> Stashed changes
  `;
}
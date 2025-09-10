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
      errorDiv.style.color = 'red';
      errorDiv.style.marginTop = '10px';
      const form = document.querySelector('.form_inputs');
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
      successDiv.style.color = 'green';
      successDiv.style.marginTop = '10px';
      const form = document.querySelector('.form_inputs');
      form.parentNode.insertBefore(successDiv, form.nextSibling);
    }
    successDiv.textContent = message;
    successDiv.style.display = 'block';
  };

  // Configurar event listeners después de que el DOM esté listo
  setTimeout(() => {
    const form = document.querySelector('.form_inputs');
    const submitBtn = document.querySelector('.submit_button input[type="submit"]');
    
    if (submitBtn) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[name="email"]').value.trim();
        const password = form.querySelector('input[name="password"]').value;
        await handleLogin(email, password);
      });
    }
  }, 0);

  return `
    <main>
      <h1>Iniciar sesión</h1>
      <form class="form_inputs">
        <div>
          <label for="email">Correo electrónico:</label>
          <input  type="email" name="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" name="password" required />
        </div>
        <div class="submit_button">
          <input class="btn red circular" type="submit" value="Entrar" />
        </div>
      </form>
    </main>
  `;
}

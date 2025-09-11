document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form_inputs');
  const submitBtn = document.querySelector('.submit_button input[type="submit"]');

  // Crear contenedor de mensajes si no existe
  let errorDiv = document.getElementById('error-message');
  let successDiv = document.getElementById('success-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
  }
  if (!successDiv) {
    successDiv = document.createElement('div');
    successDiv.id = 'success-message';
    successDiv.style.color = 'green';
    successDiv.style.marginTop = '10px';
    successDiv.style.display = 'none';
    form.parentNode.insertBefore(successDiv, errorDiv.nextSibling);
  }

  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    successDiv.textContent = '';
    successDiv.style.display = 'none';

    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;

    // Validaciones básicas
    if (!email || !password) {
      errorDiv.textContent = 'Por favor, completa todos los campos.';
      errorDiv.style.display = 'block';
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorDiv.textContent = 'Por favor, ingresa un correo electrónico válido.';
      errorDiv.style.display = 'block';
      return;
    }

    // Petición al backend (ajusta la URL según tu API)
    try {
      const response = await fetch('https://todo-center-back.onreder.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password })
      });
      const data = await response.json();
      if (!response.ok) {
        errorDiv.textContent = data.message || 'Credenciales incorrectas.';
        errorDiv.style.display = 'block';
      } else {
        // Guarda el token en localStorage
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token);
        }
        successDiv.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        setTimeout(() => {
          window.location.href = 'taskpage.html';
        }, 2000);
      }
    } catch (err) {
      errorDiv.textContent = 'No se pudo conectar con el servidor.';
      errorDiv.style.display = 'block';
    }
  });
});

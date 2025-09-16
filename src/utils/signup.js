document.addEventListener('DOMContentLoaded', function () {
  const formInputs = document.querySelector('.form_inputs');
  const submitBtn = document.querySelector('.submit_button input[type="submit"]');

  // Crear contenedores de mensajes si no existen
  let errorDiv = document.getElementById('error-message');
  let successDiv = document.getElementById('success-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    submitBtn.parentNode.appendChild(errorDiv);
  }
  if (!successDiv) {
    successDiv = document.createElement('div');
    successDiv.id = 'success-message';
    successDiv.style.color = 'green';
    successDiv.style.marginTop = '10px';
    submitBtn.parentNode.appendChild(successDiv);
  }

  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    errorDiv.textContent = '';
    successDiv.textContent = '';

    const nombresInput = formInputs.querySelector('input[name="nombres"]');
    const apellidosInput = formInputs.querySelector('input[name="apellidos"]');
    const edadInput = formInputs.querySelector('input[name="edad"]');
    const correoInput = formInputs.querySelector('input[name="correo"]');
    const contrasenaInput = formInputs.querySelector('input[name="contrasena"]');
    const confirmarContrasenaInput = formInputs.querySelector('input[name="confirmarContrasena"]');

    const nombres = nombresInput.value.trim();
    const apellidos = apellidosInput.value.trim();
    const edad = edadInput.value.trim();
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;
    const confirmarContrasena = confirmarContrasenaInput.value;

    // Validaciones básicas
    if (!nombres || !apellidos || !edad || !correo || !contrasena || !confirmarContrasena) {
      errorDiv.textContent = 'Por favor, completa todos los campos.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      // Limpiar los campos vacíos
      if (!nombres) nombresInput.value = '';
      if (!apellidos) apellidosInput.value = '';
      if (!edad) edadInput.value = '';
      if (!correo) correoInput.value = '';
      if (!contrasena) contrasenaInput.value = '';
      if (!confirmarContrasena) confirmarContrasenaInput.value = '';
      return;
    }

    // Validar nombres y apellidos mínimo 2 caracteres
    if (nombres.length < 2) {
      errorDiv.textContent = 'El nombre debe tener al menos 2 caracteres.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      nombresInput.value = '';
      return;
    }
    if (apellidos.length < 2) {
      errorDiv.textContent = 'El apellido debe tener al menos 2 caracteres.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      apellidosInput.value = '';
      return;
    }

    // Validar que la edad esté entre 13 y 120
    const edadNumber = Number(edad);
    if (isNaN(edadNumber) || edadNumber < 13 || edadNumber > 120) {
      errorDiv.textContent = 'La edad debe estar entre 13 y 120.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      edadInput.value = '';
      return;
    }
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errorDiv.textContent = 'Por favor, ingresa un correo electrónico válido.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      correoInput.value = '';
      return;
    }

    // Validar contraseña segura
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
    if (!passwordRegex.test(contrasena)) {
      errorDiv.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      contrasenaInput.value = '';
      confirmarContrasenaInput.value = '';
      return;
    }

    if (contrasena !== confirmarContrasena) {
      errorDiv.textContent = 'Las contraseñas no coinciden.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
      contrasenaInput.value = '';
      confirmarContrasenaInput.value = '';
      return;
    }

    // Petición al backend
    try {
      const response = await fetch('https://todo-center-back.onreder.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres,
          apellidos,
          edad: Number(edad),
          correo,
          contrasena,
          confirmarContrasena
        })
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        errorDiv.textContent = data.message || 'Error al registrar usuario.';
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
      } else {
        successDiv.textContent = '¡Registro exitoso! Redirigiendo a inicio de sesión...';
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        formInputs.querySelectorAll('input').forEach(input => input.value = '');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    } catch (err) {
      errorDiv.textContent = 'No se pudo conectar con el servidor.';
      errorDiv.style.display = 'block';
      successDiv.style.display = 'none';
    }
  });
});

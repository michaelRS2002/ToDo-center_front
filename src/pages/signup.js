export default function Signup() {
  // Popup logic
  function showPopup(message, type = 'error') {
    let popup = document.getElementById('popup-message');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'popup-message';
      document.body.appendChild(popup);
    }
    popup.className = `popup-message popup-${type} popup-show`;
    popup.textContent = message;
    // Remove after 3s
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

  setTimeout(() => {
    const formInputs = document.querySelector('.form_inputs');
    const submitBtn = document.querySelector('.submit_button input[type="submit"]');

    submitBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      // ...existing code...
      const firstNameInput = formInputs.querySelector('input[name="firstName"]');
      const lastNameInput = formInputs.querySelector('input[name="lastName"]');
      const ageInput = formInputs.querySelector('input[name="age"]');
      const emailInput = formInputs.querySelector('input[name="email"]');
      const passwordInput = formInputs.querySelector('input[name="password"]');
      const confirmPasswordInput = formInputs.querySelector('input[name="confirmPassword"]');

      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const age = ageInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Basic validations
      if (!firstName || !lastName || !age || !email || !password || !confirmPassword) {
        showError('Por favor, completa todos los campos.');
        // Clear empty fields
        if (!firstName) firstNameInput.value = '';
        if (!lastName) lastNameInput.value = '';
        if (!age) ageInput.value = '';
        if (!email) emailInput.value = '';
        if (!password) passwordInput.value = '';
        if (!confirmPassword) confirmPasswordInput.value = '';
        return;
      }

      // Validate first and last name min 2 chars
      if (firstName.length < 2) {
        showError('El nombre debe tener al menos 2 caracteres.');
        firstNameInput.value = '';
        return;
      }
      if (lastName.length < 2) {
        showError('El apellido debe tener al menos 2 caracteres.');
        lastNameInput.value = '';
        return;
      }

      // Validate age between 13 and 120
      const ageNumber = Number(age);
      if (isNaN(ageNumber) || ageNumber < 13 || ageNumber > 120) {
        showError('La edad debe estar entre 13 y 120.');
        ageInput.value = '';
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Por favor, ingresa un correo electrónico válido.');
        emailInput.value = '';
        return;
      }

      // Validate strong password
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
      if (!passwordRegex.test(password)) {
        showError('La contraseña debe tener al menos 8 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.');
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        return;
      }

      if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden.');
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        return;
      }

      // Backend request
      try {
        const response = await fetch('https://todo-center-back.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombres: firstName,
            apellidos: lastName,
            edad: Number(age),
            correo: email,
            contrasena: password,
            confirmarContrasena: confirmPassword
          })
        });
        const data = await response.json();
        if (!response.ok) {
          showError(data.message || 'Error al registrar usuario.');
        } else {
          showSuccess('¡Registro exitoso! Redirigiendo a inicio de sesión...');
          formInputs.querySelectorAll('input').forEach(input => input.value = '');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } catch (err) {
        showError('No se pudo conectar con el servidor.');
      }
    });
  }, 0);

  return `
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Registrarse
        </h1>
        <div class="form_inputs">
          <label class="label label-required">Nombre</label>
          <input type="text" name="firstName" placeholder="Jairo" class="input">
          <label class="label label-required">Apellido</label>
          <input type="text" name="lastName" placeholder="Castro López" class="input">
          <label class="label label-required">Edad</label>
          <input type="text" name="age" placeholder="24" class="input">
          <label class="label label-required">Correo</label>
          <input type="email" name="email" placeholder="ejemplo@gmail.com" class="input">
          <label class="label label-required">Contraseña</label>
          <input type="password" name="password" placeholder="*******" class="input">
          <label class="label label-required">Confirmar contraseña</label>
          <input type="password" name="confirmPassword" placeholder="*******" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary btn-block" type="submit" value="Registrarse">
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width= "300rem" height="auto">
      </div>
    <footer>
      <a href="/sitemap">Sitemap</a> 
    </footer>
    </main>
  `;
}

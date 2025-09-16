export default function Rese() {
  // Popup logic (same as signup/login)
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

  setTimeout(() => {
    const formInputs = document.querySelector('.form_inputs');
    const submitBtn = document.querySelector('.submit_button input[type="submit"]');
    if (submitBtn && formInputs) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const passwordInput = formInputs.querySelector('input[name="new_password"]');
        const confirmInput = formInputs.querySelector('input[name="com_password"]');
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        // Validate passwords
        if (!password || !confirmPassword) {
          showError('Por favor, completa ambos campos.');
          return;
        }
        // Strong password: min 8, 1 upper, 1 lower, 1 number, 1 special
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
        if (!passwordRegex.test(password)) {
          showError('La contraseña debe tener al menos 8 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.');
          passwordInput.value = '';
          confirmInput.value = '';
          return;
        }
        if (password !== confirmPassword) {
          showError('Las contraseñas no coinciden.');
          passwordInput.value = '';
          confirmInput.value = '';
          return;
        }
        try {
          // Get token from URL (?token=...)
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          if (!token) {
            showError('Token de restablecimiento no encontrado.');
            return;
          }
          const response = await fetch('https://todo-center-back.onrender.com/api/password-reset/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token,
              nuevaContrasena: password,
              confirmarContrasena: confirmPassword
            })
          });
          const data = await response.json();
          if (!response.ok) {
            showError(data.message || 'No se pudo cambiar la contraseña.');
          } else {
            showSuccess('¡Contraseña cambiada exitosamente! Redirigiendo a inicio de sesión...');
            passwordInput.value = '';
            confirmInput.value = '';
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        } catch (err) {
          showError('No se pudo conectar con el servidor.');
        }
      });
    }
  }, 0);

  return `
    <main class="fpassword_main">
      <div class="div_form">
        <h1>
          Cambiar contraseña
        </h1>
        <div class="form_inputs">
          <label class="label label-required">Contraseña</label>
          <input type="password" name="new_password" placeholder="******" class="input">
          <label class="label label-required">Confirmar contraseña</label>
          <input type="password" name="com_password" placeholder="Confirmar contraseña" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" type="submit" value="Guardar contraseña">
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width= "300rem" height="auto">
      </div>
    </main>
  `;
}
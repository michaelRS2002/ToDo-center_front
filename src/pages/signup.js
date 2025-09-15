export default function Signup() {
  // Función para manejar el registro
  const handleSignup = async (formData) => {
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

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      showError('Las contraseñas no coinciden.');
      return;
    }

    if (formData.password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.fullName,
          correo: formData.email,
          contrasena: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        showError(data.message || 'Error al crear la cuenta.');
      } else {
        showSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (err) {
      showError('No se pudo conectar con el servidor.');
    }
  };

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

  // Event listeners
  setTimeout(() => {
    const form = document.querySelector('.auth-form');
    const submitBtn = document.querySelector('button[type="submit"]');
    
    if (submitBtn && form) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const formData = {
          fullName: form.querySelector('input[name="fullName"]').value.trim(),
          email: form.querySelector('input[name="email"]').value.trim(),
          password: form.querySelector('input[name="password"]').value,
          confirmPassword: form.querySelector('input[name="confirmPassword"]').value
        };
        
        await handleSignup(formData);
      });
    }
  }, 0);

  return `
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Registrarse
        </h1>
        <div class="form_inputs">
          <label class="label label-required">Nombre</label>
          <input type="text" name="names" placeholder="Juan Perez" class="input">
          <label class="label label-required">Apellido</label>
          <input type="text" name="surnames" placeholder="Gonzalez Lopez" class="input">
          <label class="label label-required">Edad</label>
          <input type="text" name="age" placeholder="24" class="input">
          <label class="label label-required">Correo</label>
          <input type="email" name="email" placeholder="ejemplo@gmail.com" class="input">
          <label class="label label-required">Contraseña</label>
          <input type="password" name="password" placeholder="*******" class="input">
          <label class="label label-required">Confirmar contraseña</label>
          <input type="password" name="cpassword" placeholder="*******" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary btn-block" type="submit" value="Crear cuenta">
        </div>
      </div>
      <div class="div_logo">
        <img src="public/images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="sitemap.html">Sitemap</a> 
    </footer>
    </main>
  `;
}

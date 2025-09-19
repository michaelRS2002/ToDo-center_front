export default function UserEdit() {
  const path = window.location.pathname;
if (
  !localStorage.getItem('token') &&
  path !== '/login' &&
  path !== '/signup' &&
  path !== '/' &&
  path !== '/forgot-password' &&
  path !== '/reset' &&
  path !== '/sitemap'
) {
  window.location.href = '/login';
  return '';
}

  setTimeout(() => {
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
      clearTimeout(popup._timeout);
      popup._timeout = setTimeout(() => {
        popup.classList.remove('popup-show');
      }, 3000);
    }

    // Llenar campos con datos actuales
    async function fetchProfile() {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await fetch('https://todo-center-back.onrender.com/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.data) {
          document.querySelector('input[name="names"]').value = data.data.firstName || '';
          document.querySelector('input[name="surnames"]').value = data.data.lastName || '';
          document.querySelector('input[name="age"]').value = data.data.age || '';
          document.querySelector('input[name="email"]').value = data.data.email || '';
        }
      } catch {}
    }
    fetchProfile();

    // PUT al backend al guardar
    const submitBtn = document.querySelector('.submit_button input[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const firstName = document.querySelector('input[name="names"]').value.trim();
        const lastName = document.querySelector('input[name="surnames"]').value.trim();
        const age = document.querySelector('input[name="age"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        if (!firstName || !lastName || !age || !email) {
          showPopup('Todos los campos son requeridos', 'error');
          return;
        }
        if (parseInt(age) < 13) {
          showPopup('La edad mínima es 13 años', 'error');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showPopup('Formato de email inválido', 'error');
          return;
        }
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://todo-center-back.onrender.com/api/users/me', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              firstName,
              lastName,
              age: parseInt(age),
              email
            })
          });
          const data = await response.json();
          if (!response.ok) {
            showPopup(data.message || 'No se pudo actualizar el perfil.', 'error');
          } else {
            showPopup('Perfil actualizado exitosamente', 'success');
            setTimeout(() => {
              window.location.href = '/profile';
            }, 1200);
          }
        } catch (err) {
          showPopup('No se pudo conectar con el servidor.', 'error');
        }
      });
    }
  }, 0);

  return `
    <body>
    <main class="user_main">
      <div class="div_form">
        <h1>
          Ingrese sus nuevos datos
        </h1>
        <div class="form_inputs">
          <label class="label">Nombre</label>
          <input type="text" name="names" placeholder="Juan Pedro" class="input">
          <label class="label">Apellido</label>
          <input type="text" name="surnames" placeholder="Gonzalez" class="input">
          <label class="label">Edad</label>
          <input type="number" name="age" placeholder="18" class="input">
          <label class="label">Email</label>
          <input type="email" name="email" placeholder="ejemplo@gmail.com" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" type="submit" value="Guardar datos">
        </div>
      </div>
      <div class="div_logo">
        <img src="/images/logo.png" width="300rem" height="auto">
      </div>
    
    <footer>
      <a href="/sitemap">Sitemap</a> 
    </footer>
    </main>
  </body>
 `;
}
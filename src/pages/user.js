export default function User() {
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

    async function fetchProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        showPopup('No autenticado. Inicia sesión.', 'error');
        return;
      }
      try {
        const response = await fetch('https://todo-center-back.onrender.com/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok || !data.data) {
          showPopup(data.message || 'No se pudo obtener el perfil.', 'error');
          return;
        }
        // Llenar los campos
        document.querySelector('input[name="names"]').value = data.data.firstName || '';
        document.querySelector('input[name="surnames"]').value = data.data.lastName || '';
        document.querySelector('input[name="age"]').value = data.data.age || '';
        document.querySelector('input[name="email"]').value = data.data.email || '';
        document.querySelector('input[name="member_since"]').value = data.data.createdAt ? new Date(data.data.createdAt).toLocaleDateString() : '';
      } catch (err) {
        showPopup('No se pudo conectar con el servidor.', 'error');
      }
    }
    fetchProfile();
  }, 0);

  return `
<body>
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Datos del usuario
        </h1>
        <div class="form_inputs">
          <label class="label">Nombre</label>
          <input type="text" name="names" readonly placeholder="Names" class="input">
          <label class="label">Apellido</label>
          <input type="text" name="surnames" readonly  placeholder="Surname" class="input">
          <label class="label">Edad</label>
          <input type="number" name="age" readonly  placeholder="Age" class="input">
          <label class="label">Correo electrónico</label>
          <input type="email" name="email" readonly  placeholder="example@gmail.com" class="input">
          <label class="label">Miembro desde</label>
          <input type="text" name="member_since" readonly  placeholder="8 years" class="input">
        </div>
        <div class="submit_button">
          <a class="btn btn-primary" href="/user-edit">Editar perfil</a>
          <a class="btn btn-primary" href="/profile/delete">Eliminar perfil</a>
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="/sitemap">Sitemap</a>
    </footer>
    </main>
  </body>
  `;
}
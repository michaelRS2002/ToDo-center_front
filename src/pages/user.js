export default function User() {
  // Elimina el CSS inline, ya está en buttons.css

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
          <button class="btn btn-delete" id="delete-profile-btn" type="button">Eliminar perfil</button>
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

// Helpers y lógica de eventos: deben ejecutarse después de que el DOM esté en pantalla
setTimeout(() => {
  // Popup feedback
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

  // Gmail-style undo popup
  function showUndoPopup(message, onUndo) {
    let popup = document.getElementById('popup-message');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'popup-message';
      document.body.appendChild(popup);
    }
    popup.className = 'popup-message popup-success popup-show';
    popup.innerHTML = message + '<button id="undo-btn" class="btn btn-delete" style="margin-left:1em;">Deshacer</button>';
    clearTimeout(popup._timeout);
    popup._timeout = setTimeout(() => {
      popup.classList.remove('popup-show');
    }, 10000);
    document.getElementById('undo-btn').onclick = () => {
      popup.classList.remove('popup-show');
      if (onUndo) onUndo();
    };
  }

  // Fetch y llena el perfil
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

  // Lógica para eliminar perfil con undo
  const deleteBtn = document.getElementById('delete-profile-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      const confirmText = prompt('Para eliminar tu cuenta escribe: ELIMINAR');
      if (confirmText !== 'ELIMINAR') {
        showPopup('Debes escribir ELIMINAR para confirmar', 'error');
        return;
      }
      const password = prompt('Ingresa tu contraseña para confirmar:');
      if (!password) {
        showPopup('Debes ingresar tu contraseña', 'error');
        return;
      }
      let undo = false;
      showUndoPopup('Cuenta será eliminada en 10 segundos. ', () => {
        undo = true;
        showPopup('Eliminación cancelada.', 'success');
      });
      setTimeout(async () => {
        if (undo) return;
        const token = localStorage.getItem('token');
        try {
          let headers = { 'Content-Type': 'application/json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;
          const response = await fetch('https://todo-center-back.onrender.com/api/users/me', {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({ password, confirmText })
          });
          if (response.status === 204) {
            showPopup('Cuenta eliminada.', 'success');
            setTimeout(() => {
              localStorage.clear();
              window.location.href = '/signup';
            }, 1500);
          } else {
            const data = await response.json();
            showPopup(data.message || 'No se pudo eliminar la cuenta.', 'error');
          }
        } catch (err) {
          showPopup('No se pudo conectar con el servidor.', 'error');
        }
      }, 10000);
    });
  }
}, 0);

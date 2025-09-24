export default function User() {
  // Elimina el CSS inline, ya está en buttons.css

  return `
  <a href="#" onclick="window.history.back();" class="volver">
        <i class="fas fa-arrow-left"></i> Volver atrás
      </a>
    <main class="user_main">
      <div class="div_form">
        <h1>
          Datos de Usuario
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
        <div class="submit_button_edit">
          <button class="btn-edit" id="edit-profile-btn" onclick="window.location.href='/user-edit'">Editar Perfil</button>
          <button class="btn-delete" id="delete-profile-btn" type="button">Eliminar Perfil</button>
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width= "300rem" height="auto">
      </div>
    </main>
  `;
}

// Helpers y lógica de eventos: deben ejecutarse después de que el DOM esté en pantalla
setTimeout(() => {
  // Popup feedback
  function showPopup(message, type = 'error') {
    if (typeof document === 'undefined') return;
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
    popup.className = 'popup-message popup-error popup-show';
    popup.innerHTML = message + '<button id="undo-btn" class="btn btn-primary" style="margin-left:1rem;background-color:#3b82f6;border-color:#3b82f6;">Deshacer</button>';
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
      // No mostrar popup ni redirigir ni mostrar error
      return;
    }
    try {
      const response = await fetch('https://todo-center-back.onrender.com/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok || !data.data) {
        // No mostrar popup, solo no llenar datos
        return;
      }
      document.querySelector('input[name="names"]').value = data.data.firstName || '';
      document.querySelector('input[name="surnames"]').value = data.data.lastName || '';
      document.querySelector('input[name="age"]').value = data.data.age || '';
      document.querySelector('input[name="email"]').value = data.data.email || '';
      document.querySelector('input[name="member_since"]').value = data.data.createdAt ? new Date(data.data.createdAt).toLocaleDateString() : '';
    } catch (err) {
      // No mostrar popup
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

      // Modal de contraseña con input type=password
      let password = await new Promise((resolve) => {
        // Crea modal
        let modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(239,68,68,0.15)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
          <div style="background:#111;color:#fff;padding:2em 2em 1.5em 2em;border-radius:10px;box-shadow:0 2px 16px #0008;min-width:300px;max-width:90vw;display:flex;flex-direction:column;align-items:center;">
            <label style=\"margin-bottom:0.5em;font-weight:bold;color:#fff;\">Ingresa tu contraseña para confirmar:</label>
            <input id=\"modal-password-input\" type=\"password\" style=\"padding:0.5em 1em;font-size:1em;width:100%;margin-bottom:1em;border-radius:6px;border:1px solid #444;background:#222;color:#fff;\" autofocus>
            <div style=\"display:flex;gap:1em;justify-content:center;width:100%;\">
              <button id=\"modal-password-ok\" class=\"btn btn-delete\" style=\"min-width:110px;background:#ef4444;border-color:#ef4444;color:#fff;\">Eliminar</button>
              <button id=\"modal-password-cancel\" class=\"btn btn-primary\" style=\"min-width:110px;background:#3b82f6;border-color:#3b82f6;color:#fff;\">Cancelar</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        const input = modal.querySelector('#modal-password-input');
        input.focus();
        // Confirmar
        modal.querySelector('#modal-password-ok').onclick = () => {
          resolve(input.value);
          document.body.removeChild(modal);
        };
        // Cancelar
        modal.querySelector('#modal-password-cancel').onclick = () => {
          resolve('');
          document.body.removeChild(modal);
        };
        // Enter/cancel con teclado
        input.onkeydown = (e) => {
          if (e.key === 'Enter') modal.querySelector('#modal-password-ok').click();
          if (e.key === 'Escape') modal.querySelector('#modal-password-cancel').click();
        };
      });
      if (!password) {
        showPopup('Debes ingresar tu contraseña', 'error');
        return;
      }
      // Solo valida que el campo no esté vacío antes de mostrar undo
      // El backend validará la contraseña al intentar el DELETE
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

}, 0);

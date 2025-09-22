export default function Newtask() {
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

    function showError(msg) { showPopup(msg, 'error'); }
    function showSuccess(msg) { showPopup(msg, 'success'); }

    const form = document.getElementById('task-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const titulo = document.getElementById('task-name').value.trim();
        const detalle = document.getElementById('task-desc').value.trim();
        const fecha = document.getElementById('task-date').value;
        const start = document.getElementById('start-time').value;
        const end = document.getElementById('end-time').value;
        const estadoSelect = document.getElementById('task-status').value;

        // Mapear valores del select a los valores válidos del backend (ambos idiomas)
        let estadoMap = {
          'Por hacer': 'Por hacer',
          'Haciendo': 'Haciendo',
          'Hecho': 'Hecho',
          'pending': 'Por hacer',
          'inprocess': 'Haciendo',
          'completed': 'Hecho'
        };
        const estadoReal = estadoMap[estadoSelect] || estadoSelect;

        // Validaciones estrictas frontend
        if (!titulo) {
          showError('El título es requerido');
          return;
        }
        if (titulo.length > 50) {
          showError('El título no puede exceder 50 caracteres');
          return;
        }
        if (detalle.length > 500) {
          showError('El detalle no puede exceder 500 caracteres');
          return;
        }
        if (!fecha) {
          showError('La fecha es requerida');
          return;
        }
        // Validar fecha futura
        const inputDate = new Date(fecha);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate < today) {
          showError('La fecha debe ser futura');
          return;
        }
        // Validar hora formato HH:mm
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!start || !timeRegex.test(start)) {
          showError('La hora de inicio es requerida y debe tener formato HH:mm');
          return;
        }
        if (!end || !timeRegex.test(end)) {
          showError('La hora de fin es requerida y debe tener formato HH:mm');
          return;
        }
        // Validar estado
        const validStatus = ['Por hacer', 'Haciendo', 'Hecho'];
        if (!validStatus.includes(estadoReal)) {
          showError('Estado inválido');
          return;
        }

        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://todo-center-back.onrender.com/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              titulo,
              detalle,
              fecha,
              start,
              end,
              estado: estadoReal
            })
          });
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            showSuccess('¡Tarea creada exitosamente!');
            // Opcional: agregar la tarea a localStorage para reflejar en la UI sin recargar
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            if (data.task) {
              tasks.push(data.task);
              localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            setTimeout(() => {
              window.location.href = '/tasks';
            }, 1200);
          } else {
            showError(data.message || 'No se pudo crear la tarea.');
            return;
          }
        } catch (err) {
          showError('No se pudo conectar con el servidor.');
        }
      });
    }
  }, 0);

  return `
  <div class="container-contact100">
    <a href="#" onclick="window.history.back();" class="volver">
      <i class="fas fa-arrow-left"></i> Volver atrás
    </a>

		<div class="wrap-contact100">

        <h1>Informacion de Tarea</h1>
        
        <form id="task-form">
        <label for="task-name">Titulo</label>
				<input class="input100" type="text" name="titulo" placeholder="Escriba el nombre de la tarea..." id="task-name" required>
        <label for="task-desc">Descripcion</label>
				<textarea class="input100" name="detalle" placeholder="Escriba de que se trata su tarea..." id="task-desc"></textarea>
        <div class="form-row">
            <div class="form-group">
            <label for="task-date">Fecha</label>
            <input type="date" id="task-date" name="fecha" required>
            </div>
            <div class="form-group">
            <label for="start-time">Inicio</label>
            <input type="time" id="start-time" name="start" required>
            </div>
            <div class="form-group">
            <label for="end-time">Fin</label>
            <input type="time" id="end-time" name="end" required>
            </div>
            <div class="form-group">
            <label for="task-status">Estado de Tarea</label>
            <select id="task-status" name="estado">
                <option value="pending" selected>Por hacer</option>
                <option value="inprocess">Haciendo</option>
                <option value="completed">Hecho</option>
            </select>
            </div>
        </div>
          <button type="submit" class="create-btn">Crear Tarea</button>
        </form>

    </div>
	</div>
`;
}

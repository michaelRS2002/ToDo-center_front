export default function Newtask() {
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
        const name = document.getElementById('task-name').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const date = document.getElementById('task-date').value;
        const start = document.getElementById('start-time').value;
        const end = document.getElementById('end-time').value;
        const status = document.getElementById('task-status').value;

        if (!name || !date || !start || !end) {
          showError('Por favor, completa todos los campos obligatorios.');
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
              name,
              description: desc,
              date,
              start,
              end,
              status
            })
          });
          const data = await response.json();
          if (!response.ok) {
            showError(data.message || 'No se pudo crear la tarea.');
          } else {
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
          }
        } catch (err) {
          showError('No se pudo conectar con el servidor.');
        }
      });
    }
  }, 0);

  return `
  <div class="container-contact100">
		<div class="wrap-contact100">

        <h1>Informacion de Tarea</h1>
        
        <form id="task-form">
        <label>Titulo</label>
				<input class="input100" type="text" name="name" placeholder="Escriba el nombre de la tarea..." id="task-name" required>
        <label>Descripcion</label>
				<textarea class="input100" name="message" placeholder="Escriba de que se trata su tarea..." id="task-desc"></textarea>
        <div class="form-row">
            <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="task-date" required>
            </div>
            <div class="form-group">
            <label>Inicio</label>
            <input type="time" id="start-time" required>
            </div>
            <div class="form-group">
            <label>Fin</label>
            <input type="time" id="end-time" required>
            </div>
            <div class="form-group">
            <label>Estado de Tarea</label>
            <select id="task-status">
                <option value="pending" selected>Pendiente</option>
                <option value="inprocess">En Proceso</option>
                <option value="completed">Completado</option>
            </select>
            </div>
        </div>
          <button type="submit" class="create-btn">Crear Tarea</button>
        </form>

    </div>
	</div>
`;
}

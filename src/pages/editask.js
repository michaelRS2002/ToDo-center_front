export default function ediTask() {
  const taskToEditId = localStorage.getItem("taskToEdit");
  console.log("En edit", taskToEditId);

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Buscar por _id (Mongo) o fallback a id numérico si existe
  const task = tasks.find(t => t._id === taskToEditId || t.id == taskToEditId);
  // Si no se encuentra la tarea, mostrar error
  if (!task) {
    return `
    <div class="container-contact100">
      <div class="wrap-contact100">
        <h1>❌ Tarea no encontrada</h1>
        <p>La tarea que intentas editar no existe.</p>
        <a href="/tasks" class="create-btn">Volver a Tareas</a>
      </div>
    </div>
    `;
  }

  // Formatear fecha a yyyy-MM-dd si es necesario
  let fechaValue = task.fecha || '';
  if (fechaValue && fechaValue.length > 10) {
    // Si viene en formato ISO, recorta solo la fecha
    fechaValue = fechaValue.slice(0, 10);
  }

  // Determinar el estado actual en español para el select
  let estadoActual = task.estado;
  if (!estadoActual) {
    // Si viene en inglés, mapear a español
    const estadoMap = {
      'pending': 'Por hacer',
      'inprocess': 'Haciendo',
      'completed': 'Hecho'
    };
    estadoActual = estadoMap[task.status] || '';
  }

  const html = `
  <div class="container-contact100">
    <div class="wrap-contact100">
      <h1>✏️ Editar Tarea</h1>
      <form id="edit-task-form" data-id="${task._id || task.id}">
        <label for="edit-task-name">Título</label>
        <input class="input100" type="text" id="edit-task-name" name="titulo" value="${task.titulo || ''}" required>
        
        <label for="edit-task-desc">Descripción</label>
        <textarea class="inputedit" id="edit-task-desc" name="detalle" placeholder="Agregue una descripción">${task.detalle || ''}</textarea>
        
        <div class="form-row">
          <div class="form-group">
            <label for="edit-task-date">Fecha</label>
            <input type="date" id="edit-task-date" name="fecha" value="${fechaValue}" required>
          </div>
          <div class="form-group">
            <label for="edit-start-time">Inicio</label>
            <input type="time" id="edit-start-time" name="start" value="${task.start || ''}">
          </div>
          <div class="form-group">
            <label for="edit-end-time">Fin</label>
            <input type="time" id="edit-end-time" name="end" value="${task.end || ''}">
          </div>
          <div class="form-group">
            <label for="edit-task-status">Estado de Tarea</label>
            <select id="edit-task-status" name="estado">
              <option value="Por hacer" ${estadoActual === "Por hacer" ? "selected" : ""}>Por hacer</option>
              <option value="Haciendo" ${estadoActual === "Haciendo" ? "selected" : ""}>Haciendo</option>
              <option value="Hecho" ${estadoActual === "Hecho" ? "selected" : ""}>Hecho</option>
            </select>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="update-btn">Actualizar</button>
          <a href="/tasks" class="cancel-btn">Cancelar</a>
        </div>
      </form>
    </div>
  </div>
  `;

  // Ejecutar el JavaScript después de renderizar
  setTimeout(() => {
    initializeEditTaskForm(task._id || task.id);
  }, 100);

  return html;
}

// ===========================================
// 3. JAVASCRIPT PARA MANEJAR LA EDICIÓN (/utils/editTask.js)
// ===========================================

function initializeEditTaskForm(taskId) {
  const form = document.getElementById("edit-task-form");
  
  if (!form) {
    console.error("Formulario de edición no encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Obtener valores del formulario
    const titulo = document.getElementById("edit-task-name").value.trim();
    const detalle = document.getElementById("edit-task-desc").value.trim();
    const fecha = document.getElementById("edit-task-date").value;
    const start = document.getElementById("edit-start-time").value;
    const end = document.getElementById("edit-end-time").value;
    const estadoSelect = document.getElementById("edit-task-status").value;
    // Mapear valores del select a los valores válidos del backend
    let estadoMap = {
      'Por hacer': 'Por hacer',
      'Haciendo': 'Haciendo',
      'Hecho': 'Hecho',
      'pending': 'Por hacer',
      'inprocess': 'Haciendo',
      'completed': 'Hecho'
    };
    const estado = estadoMap[estadoSelect] || estadoSelect;

    // Validaciones estrictas frontend
    if (!titulo) {
      alert("❌ El título es requerido");
      document.getElementById("edit-task-name").focus();
      return;
    }
    if (titulo.length > 50) {
      alert("❌ El título no puede exceder 50 caracteres");
      document.getElementById("edit-task-name").focus();
      return;
    }
    if (detalle.length > 500) {
      alert("❌ El detalle no puede exceder 500 caracteres");
      document.getElementById("edit-task-desc").focus();
      return;
    }
    if (!fecha) {
      alert("❌ La fecha es obligatoria");
      document.getElementById("edit-task-date").focus();
      return;
    }
    // Validar fecha futura
    const inputDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      alert("❌ La fecha debe ser futura");
      document.getElementById("edit-task-date").focus();
      return;
    }
    // Validar hora formato HH:mm
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!start || !timeRegex.test(start)) {
      alert("❌ La hora de inicio es requerida y debe tener formato HH:mm");
      document.getElementById("edit-start-time").focus();
      return;
    }
    if (!end || !timeRegex.test(end)) {
      alert("❌ La hora de fin es requerida y debe tener formato HH:mm");
      document.getElementById("edit-end-time").focus();
      return;
    }
    // Validar estado
    const validStatus = ['Por hacer', 'Haciendo', 'Hecho'];
    if (!validStatus.includes(estado)) {
      alert("❌ Estado inválido");
      document.getElementById("edit-task-status").focus();
      return;
    }

    try {
      // PUT al backend usando el _id real
      const token = localStorage.getItem('token');
      const response = await fetch(`https://todo-center-back.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
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
          estado
        })
      });
      const data = await response.json();
      if (!response.ok) {
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          data.errors.forEach(err => {
            alert('❌ ' + (err.msg || err.message || 'Error de validación'));
          });
        } else {
          alert('❌ ' + (data.message || 'No se pudo actualizar la tarea.'));
        }
        return;
      }
      // Actualizar localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      // Encontrar índice de la tarea a actualizar por _id
      const taskIndex = tasks.findIndex(t => t._id === taskId || t.id == taskId);
      if (taskIndex === -1) {
        alert("❌ Error: Tarea no encontrada");
        return;
      }
      // Mantener algunos campos originales si es necesario
      const originalTask = tasks[taskIndex];
      const updatedTask = { ...originalTask, titulo, detalle, fecha, start, end, estado, updatedAt: new Date().toISOString() };
      tasks[taskIndex] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Tarea actualizada:", updatedTask);
      // Mostrar mensaje de éxito
      const successMessage = `✅ Tarea "${titulo}" actualizada exitosamente!\n📅 Fecha: ${fecha}${start ? `\n🕐 Horario: ${start} - ${end}` : ''}`;
      alert(successMessage);
      // Redirigir a la página principal después de un delay
      setTimeout(() => {
        window.location.href = "/tasks";
      }, 1000);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("❌ Error al actualizar la tarea. Por favor, intenta de nuevo.");
    }
  });

  // Validación en tiempo real de horarios (fusionada de utils/editTask.js)
  const startTimeInput = document.getElementById("edit-start-time");
  const endTimeInput = document.getElementById("edit-end-time");
  if (startTimeInput && endTimeInput) {
    function validateTimes() {
      if (startTimeInput.value && endTimeInput.value) {
        if (startTimeInput.value >= endTimeInput.value) {
          endTimeInput.setCustomValidity("La hora de fin debe ser posterior a la hora de inicio");
        } else {
          endTimeInput.setCustomValidity("");
        }
      } else {
        endTimeInput.setCustomValidity("");
      }
    }
    startTimeInput.addEventListener('input', validateTimes);
    endTimeInput.addEventListener('input', validateTimes);
    // Validar al cargar valores iniciales
    validateTimes();
  }
}
export default function ediTask() {
  const numericTaskId = parseInt(localStorage.getItem("taskToEdit"), 10);
  console.log("En edit", numericTaskId);

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(t => t.id == numericTaskId);
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

  const html = `
  <div class="container-contact100">
    <div class="wrap-contact100">

      <h1>✏️ Editar Tarea</h1>
      
      <form id="edit-task-form" data-id="${task.id}">
        <label>Título</label>
        <input class="input100" type="text" id="edit-task-name" value="${task.name || ''}" required>
        
        <label>Descripción</label>
        <textarea class="inputedit" id="edit-task-desc" placeholder="Agregue una descripción">${task.desc || ''}</textarea>
        
        <div class="form-row">
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="edit-task-date" value="${task.date || ''}" required>
          </div>
          <div class="form-group">
            <label>Inicio</label>
            <input type="time" id="edit-start-time" value="${task.start || ''}">
          </div>
          <div class="form-group">
            <label>Fin</label>
            <input type="time" id="edit-end-time" value="${task.end || ''}">
          </div>
          <div class="form-group">
            <label>Estado de Tarea</label>
            <select id="edit-task-status">
              <option value="pending" ${task.status === "pending" ? "selected" : ""}>Por hacer</option>
              <option value="inprocess" ${task.status === "inprocess" ? "selected" : ""}>Haciendo</option>
              <option value="completed" ${task.status === "completed" ? "selected" : ""}>Hecho</option>
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
    initializeEditTaskForm(task.id);
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
    const updatedTask = {
      id: parseInt(taskId),
      name: document.getElementById("edit-task-name").value.trim(),
      desc: document.getElementById("edit-task-desc").value.trim(),
      date: document.getElementById("edit-task-date").value,
      start: document.getElementById("edit-start-time").value,
      end: document.getElementById("edit-end-time").value,
      status: document.getElementById("edit-task-status").value,
      updatedAt: new Date().toISOString() // Timestamp de actualización
    };

    // Validaciones básicas
    if (!updatedTask.name) {
      alert("❌ El nombre de la tarea es obligatorio");
      document.getElementById("edit-task-name").focus();
      return;
    }

    if (!updatedTask.date) {
      alert("❌ La fecha es obligatoria");
      document.getElementById("edit-task-date").focus();
      return;
    }

    // Validar horarios si ambos están presentes
    if (updatedTask.start && updatedTask.end && updatedTask.start >= updatedTask.end) {
      alert("❌ La hora de inicio debe ser anterior a la hora de fin");
      document.getElementById("edit-start-time").focus();
      return;
    }

    try {
      // PUT al backend
      const token = localStorage.getItem('token');
      const response = await fetch(`https://todo-center-back.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updatedTask)
      });
      const data = await response.json();
      if (!response.ok) {
        showError(data.message || 'No se pudo actualizar la tarea.');
        return;
      }
      // Actualizar localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
      // Encontrar índice de la tarea a actualizar
      const taskIndex = tasks.findIndex(t => t.id == taskId);
      
      if (taskIndex === -1) {
        alert("❌ Error: Tarea no encontrada");
        return;
      }

      // Mantener algunos campos originales si es necesario
      const originalTask = tasks[taskIndex];
      updatedTask.createdAt = originalTask.createdAt || new Date().toISOString();

      // Actualizar la tarea
      tasks[taskIndex] = updatedTask;
      
      // Guardar en localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      console.log("Tarea actualizada:", updatedTask);
      
      // Mostrar mensaje de éxito
      const successMessage = `✅ Tarea "${updatedTask.name}" actualizada exitosamente!\n📅 Fecha: ${updatedTask.date}${updatedTask.start ? `\n🕐 Horario: ${updatedTask.start} - ${updatedTask.end}` : ''}`;
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

  // Validación en tiempo real de horarios
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
      }
    }
    
    startTimeInput.addEventListener('change', validateTimes);
    endTimeInput.addEventListener('change', validateTimes);
  }
}
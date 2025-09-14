export default function EditTask(taskId) {
  // Cargar las tareas guardadas en localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(t => t.id === taskId);

  return `
  <div class="container-contact100">
    <div class="wrap-contact100">

      <h1>Editar Tarea</h1>
      
      <form id="edit-task-form" data-id="${task.id}">
        <label>Título</label>
        <input class="input100" type="text" id="edit-task-name" value="${task.name}" required>
        
        <label>Descripción</label>
        <textarea class="input100" id="edit-task-desc">${task.description}</textarea>
        
        <div class="form-row">
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="edit-task-date" value="${task.date}" required>
          </div>
          <div class="form-group">
            <label>Inicio</label>
            <input type="time" id="edit-start-time" value="${task.start}" required>
          </div>
          <div class="form-group">
            <label>Fin</label>
            <input type="time" id="edit-end-time" value="${task.end}" required>
          </div>
          <div class="form-group">
            <label>Estado de Tarea</label>
            <select id="edit-task-status">
              <option value="pending" ${task.status === "pending" ? "selected" : ""}>Pendiente</option>
              <option value="inprocess" ${task.status === "inprocess" ? "selected" : ""}>En Proceso</option>
              <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completado</option>
            </select>
          </div>
        </div>

        <button type="submit" class="create-btn">Actualizar Tarea</button>
      </form>

    </div>
  </div>

  <script src="/utils/editTask.js"></script>
  `;
}

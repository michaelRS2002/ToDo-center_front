document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    id: Date.now(), // ID único para la tarea
    name: document.getElementById("task-name").value,
    desc: document.getElementById("task-desc").value,
    date: document.getElementById("task-date").value,
    start: document.getElementById("start-time").value,
    end: document.getElementById("end-time").value,
    status: document.getElementById("task-status").value,
  };

  // Obtener tareas existentes o crear array vacío
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Agregar nueva tarea
  tasks.push(task);
  
  // Guardar en localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  console.log("Nueva tarea creada:", task);
  alert(`Task "${task.name}" created successfully!`);

  // Opcional: redirigir a página principal
  window.location.href = 'taskpage.html'; // o tu página principal
  
  // O limpiar formulario si te quedas en la misma página
  e.target.reset();
});
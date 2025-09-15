document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Validaciones básicas
  const taskName = document.getElementById("task-name").value.trim();
  const taskDesc = document.getElementById("task-desc").value.trim();
  const taskDate = document.getElementById("task-date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const taskStatus = document.getElementById("task-status").value;

  // Validar que la fecha no sea en el pasado (opcional)
  const selectedDate = new Date(taskDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
  
  if (selectedDate < today) {
    const confirmPast = confirm("⚠️ La fecha seleccionada es en el pasado. ¿Continuar?");
    if (!confirmPast) return;
  }

  const task = {
    id: Date.now(), // ID único para la tarea
    name: taskName,
    desc: taskDesc,
    date: taskDate,
    start: startTime,
    end: endTime,
    status: taskStatus,
    createdAt: new Date().toISOString(), // Timestamp de creación
  };

  try {
    // Obtener tareas existentes o crear array vacío
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Verificar si ya existe una tarea con el mismo nombre y fecha (opcional)
    const duplicateTask = tasks.find(t => 
      t.name.toLowerCase() === taskName.toLowerCase() && 
      t.date === taskDate
    );
    
    if (duplicateTask) {
      const confirmDuplicate = confirm(`⚠️ Ya existe una tarea "${taskName}" para ${taskDate}. ¿Crear de todas formas?`);
      if (!confirmDuplicate) return;
    }
    
    // Agregar nueva tarea
    tasks.push(task);
    
    // Guardar en localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log("Nueva tarea creada:", task);
    
    // Mensaje de éxito más detallado
    const successMessage = `✅ Tarea "${task.name}" creada exitosamente!\n📅 Fecha: ${task.date}${task.start ? `\n🕐 Horario: ${task.start} - ${task.end}` : ''}`;
    alert(successMessage);

    // Limpiar formulario ANTES de redirigir
    e.target.reset();

    // Opcional: redirigir a página principal después de un pequeño delay
    setTimeout(() => {
      window.location.href = '/tasks'; // o tu página principal
    }, 1000); // 1 segundo de delay para que el usuario vea el mensaje

    // Si decides NO redirigir, descomenta esto:
    // document.getElementById("task-name").focus(); // Enfocar para crear otra tarea

  } catch (error) {
    console.error("Error al guardar la tarea:", error);
    alert("❌ Error al crear la tarea. Por favor, intenta de nuevo.");
  }
});


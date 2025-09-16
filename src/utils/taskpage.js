window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks-pending");
  const completedListEl = document.getElementById("tasks-completed");
  const inprocessListEl = document.getElementById("tasks-inprocess");
  // Selecciona el input del buscador
  const searchInput = document.querySelector(".search-input");

  // Crear un mensaje dinámico (inicialmente oculto)
  let noResultsMsg = document.createElement("p");
  noResultsMsg.id = "no-results";
  noResultsMsg.textContent = "No se encontró ninguna tarea.";
  noResultsMsg.style.display = "none";
  noResultsMsg.style.textAlign = "center";
  noResultsMsg.style.color = "crimson";
  noResultsMsg.style.fontWeight = "bold";

  // Insertamos el mensaje dentro de .tasksection
  const taskSection = document.querySelector(".tasksection");
  if (taskSection) {
    taskSection.appendChild(noResultsMsg);
  }

  // Escucha lo que el usuario escribe
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase().trim();
      const tasks = document.querySelectorAll(".task");

      let found = false;

      tasks.forEach(task => {
        const title = task.querySelector(".content .text")?.value?.toLowerCase() || "";
        const description = task.querySelector(".description .text")?.value?.toLowerCase() || "";

        if (title.includes(term) || description.includes(term)) {
          task.style.display = "flex"; // muestra coincidencia
          found = true;
        } else {
          task.style.display = "none"; // oculta lo que no coincide
        }
      });

      // Mostrar mensaje si no hay coincidencias
      if (!found && term !== "") {
        noResultsMsg.style.display = "block";
      } else {
        noResultsMsg.style.display = "none";
      }
    });
  }

    // valores iniciales
    let totalTasks = 0;
    let completedTasks = 0;

    // referencias al DOM
    const numbersEl = document.getElementById("numbers");
    const progressEl = document.getElementById("progress");

    // función para actualizar la UI
    function updateStats() {
        // actualizar número total
        // actualizar fracción (completadas / total)
        if (numbersEl) {
          numbersEl.textContent = `${completedTasks}/${totalTasks}`;
        }

        // porcentaje de progreso (evitamos división por cero)
        const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // actualizar ancho de la barra
        if (progressEl) {
          progressEl.style.width = percent + "%";

          // color dinámico opcional
          if (percent < 50) {
              progressEl.style.background = "crimson";
          } else if (percent < 100) {
              progressEl.style.background = "orange";
          } else {
              progressEl.style.background = "limegreen";
          }
        }

        if (completedTasks == totalTasks && totalTasks && totalTasks > 0){
          if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,     // cantidad de partículas
                spread: 70,             // ángulo de dispersión
                origin: { y: 0.6 }      // punto de inicio (0 = arriba, 1 = abajo)
              });
          }
        }
    }
    
    // Función para convertir hora de 24h a 12h
    function convertTo12Hour(time24) {
        if (!time24) return '';
        
        const [hours, minutes] = time24.split(':');
        let hour = parseInt(hours, 10);
        
        const ampm = hour >= 12 ? 'PM' : 'AM';
        
        hour = hour % 12;
        hour = hour ? hour : 12;
        
        const formattedHour = hour.toString().padStart(2, '0');
        
        return `${formattedHour}:${minutes} ${ampm}`;
    }

    // Función para crear el elemento de tarea en el DOM
    function createTaskElement(taskData, isFromStorage = false) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        
        // Si es de localStorage, agregamos el ID como atributo
        if (isFromStorage && taskData.id) {
            task_el.setAttribute('data-task-id', taskData.id);
        }

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
         
        // Si es una tarea completa de otra página, mostrar información detallada
        if (isFromStorage && taskData.name) {
            task_input_el.value = `${taskData.name}`;
            // Guardamos la descripción como atributo para poder mostrarla
            if (taskData.desc) {
                task_input_el.setAttribute('title', taskData.desc);
            }
        } else {
            task_input_el.value = taskData.name || taskData;
        }

        const task_description_el = document.createElement('div');
        task_description_el.classList.add('description');

        const description_input_el = document.createElement('input');
        description_input_el.type = 'text';
        description_input_el.classList.add('text');
        const startTime12 = convertTo12Hour(taskData.start);
        const endTime12 = convertTo12Hour(taskData.end);
        description_input_el.value = `${startTime12} - ${endTime12}`;
        description_input_el.setAttribute('readonly', 'readonly');

        // Agregar el input al div
        task_description_el.appendChild(description_input_el);

        // Finalmente agregar al elemento de tarea
        task_el.appendChild(task_description_el);
        
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = '<i class="fas fa-edit"></i>';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = '<i class="fas fa-trash"></i>';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);

        // Event listeners
        task_content_el.addEventListener('click', (e) => {
            console.log('Task clicked');
            task_content_el.classList.toggle('checked');
            task_input_el.classList.toggle('textchecked');

            if (task_content_el.classList.contains("checked")) {
                completedTasks = Math.min(completedTasks + 1, totalTasks);
                // mover al contenedor de completados
                if (completedListEl) {
                  completedListEl.appendChild(task_el);
                }

                // actualizar estado en localStorage
                if (isFromStorage && taskData.id) {
                    updateTaskStatusInStorage(taskData.id, "completed");
            }} else {
                completedTasks = Math.max(completedTasks - 1, 0);
                // devolver al contenedor de pendientes
                if (list_el) {
                  list_el.appendChild(task_el);
                }

                if (isFromStorage && taskData.id) {
                    updateTaskStatusInStorage(taskData.id, "pending");
                }
            }
            updateStats();
        });

      task_edit_el.addEventListener('click', (e) => {
          if (task_edit_el.dataset.mode === "edit") {
              // Cambiar a modo guardar
              task_edit_el.dataset.mode = "save";
              task_edit_el.innerHTML = '<i class="fas fa-save"></i>'; // Ícono de guardar
              task_input_el.removeAttribute("readonly");
              task_input_el.focus();
          } else {
              // Cambiar a modo editar
              task_edit_el.dataset.mode = "edit";
              task_edit_el.innerHTML = '<i class="fas fa-edit"></i>'; // Ícono de editar
              task_input_el.setAttribute("readonly", "readonly");

              // Si es una tarea de localStorage, actualizar también el storage
              if (isFromStorage && taskData.id) {
                  updateTaskNameInStorage(taskData.id, task_input_el.value);
              }
          }
      });

      task_delete_el.addEventListener('click', (e) => {
            const confirmDelete = confirm(`🗑️ ¿Eliminar la tarea "${task_input_el.value}"?`);
    
            if (!confirmDelete) return; // si el usuario cancela, no hacemos nada
            
            if (task_content_el.classList.contains("checked")) {
                completedTasks = Math.max(completedTasks - 1, 0);
            }
            totalTasks = Math.max(totalTasks - 1, 0);
            updateStats();
            
            // Si es una tarea de localStorage, eliminarla también del storage
            if (isFromStorage && taskData.id) {
                deleteTaskFromStorage(taskData.id);
            }
            
            task_el.remove();
        });

        return task_el;
    }

    // Función para actualizar el estatus de tarea en localStorage
    function updateTaskStatusInStorage(taskId, newStatus) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Función para actualizar el nombre de tarea en localStorage
    function updateTaskNameInStorage(taskId, newName) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].name = newName;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Función para eliminar tarea de localStorage
    function deleteTaskFromStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para limpiar contenedores
    function clearAllContainers() {
        if (list_el) list_el.innerHTML = '';
        if (completedListEl) completedListEl.innerHTML = '';
        if (inprocessListEl) inprocessListEl.innerHTML = '';
        totalTasks = 0;
        completedTasks = 0;
    }

    // Función para cargar tareas desde localStorage
    function loadTasksFromStorage() {
        // Primero limpiar contenedores para evitar duplicados
        clearAllContainers();
        
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(task => {
            const task_el = createTaskElement(task, true);
            const task_content_el = task_el.querySelector('.content');
            const task_input_el = task_el.querySelector('.text');

            if (task.status === "completed") {
              task_content_el.classList.add("checked");
              task_input_el.classList.add("textchecked");
              if (completedListEl) {
                completedListEl.appendChild(task_el);
              }
              completedTasks++;
            } else if (task.status === "inprocess") {
              if (inprocessListEl) {
                inprocessListEl.appendChild(task_el);
              }
            } else {
              if (list_el) {
                list_el.appendChild(task_el); // pendiente
              }
            }

            totalTasks++;
        });
        updateStats();
    }

    // Cargar tareas existentes al inicializar
    loadTasksFromStorage();
    console.log("Tareas cargadas");

    // Event listener para el formulario (tareas creadas localmente)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!input.value.trim()) {
          alert('Por favor ingresa un nombre para la tarea');
          return;
        }
        
        const status = document.getElementById("task-status") ? 
                      document.getElementById("task-status").value : "pending";
        
        const taskData = {
          id: Date.now(),
          name: input.value.trim(),
          desc: "",
          date: "",
          start: "",
          end: "",
          status: status
        };

        // Guardar en localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskData);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // OPCIÓN 1: Recargar página (tu método actual)
        // location.reload();

        // OPCIÓN 2: Mostrar inmediatamente sin recargar (más eficiente)
        const task_el = createTaskElement(taskData, true);
        
        if (status === "completed") {
          task_el.querySelector('.content').classList.add("checked");
          task_el.querySelector('.text').classList.add("textchecked");
          if (completedListEl) {
            completedListEl.appendChild(task_el);
          }
          completedTasks++;
        } else if (status === "inprocess") {
          if (inprocessListEl) {
            inprocessListEl.appendChild(task_el);
          }
        } else {
          if (list_el) {
            list_el.appendChild(task_el);
          }
        }
        
        totalTasks++;
        updateStats();
        
        // Limpiar input
        input.value = '';
        
        console.log('Nueva tarea creada:', taskData);
      });
    }

    // Escuchar cambios en localStorage para sincronizar en tiempo real
    window.addEventListener('storage', (e) => {
        if (e.key === 'tasks') {
            console.log('Cambio detectado en localStorage');
            loadTasksFromStorage();
        }
    });
});


/*

document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', async function (e) {
      e.preventDefault();

      // Usar o crear el div de mensaje de éxito con el mismo estilo que en index
      let successDiv = document.getElementById('success-message');
      if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'success-message';
        successDiv.style.display = 'none';
        document.body.insertBefore(successDiv, document.body.firstChild);
      }

      try {
        await fetch('https://todo-center-back.onreder.com/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        successDiv.textContent = '¡Cerraste sesión exitosamente! Redirigiendo...';
        successDiv.classList.add('show');
        setTimeout(() => {
          successDiv.classList.remove('show');
          window.location.href = 'login.html';
        }, 2000);
      } catch (err) {
        alert('No se pudo conectar con el servidor.');
      } finally {
        localStorage.removeItem('token');
      }
    });
  }
}); // 👈 aquí cerramos bien
*/
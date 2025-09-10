window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks-pending");

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
        numbersEl.textContent = `${completedTasks}/${totalTasks}`;

        // porcentaje de progreso (evitamos división por cero)
        const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // actualizar ancho de la barra
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
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        //task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);

        // Event listeners
        task_content_el.addEventListener('click', (e) => {
            console.log('Task clicked');
            task_content_el.classList.toggle('checked');
            task_input_el.classList.toggle('textchecked');

            if (task_content_el.classList.contains("checked")) {
                completedTasks = Math.min(completedTasks + 1, totalTasks);
            } else {
                completedTasks = Math.max(completedTasks - 1, 0);
            }
            updateStats();
        });

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                
                // Si es una tarea de localStorage, actualizar también el storage
                if (isFromStorage && taskData.id) {
                    updateTaskInStorage(taskData.id, task_input_el.value);
                }
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            const confirmDelete = confirm(`Are you sure you want to delete the task "${task_input_el.value}"?`);
    
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
            
            list_el.removeChild(task_el);
        });

        return task_el;
    }

    // Función para actualizar tarea en localStorage
    function updateTaskInStorage(taskId, newValue) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            // Actualizar solo el nombre, mantener otros datos
            tasks[taskIndex].name = newValue;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Función para eliminar tarea de localStorage
    function deleteTaskFromStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar tareas desde localStorage
    function loadTasksFromStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        tasks.forEach(task => {
            const task_el = createTaskElement(task, true);
            list_el.appendChild(task_el);
            totalTasks++;
        });
        
        updateStats();
    }

    // Cargar tareas existentes al inicializar
    loadTasksFromStorage();

    // Event listener para el formulario (tareas creadas localmente)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        totalTasks++;
        
        const task_el = createTaskElement(task, false);
        list_el.appendChild(task_el);
        
        input.value = '';
        updateStats();
      });
    }

    // Opcional: Escuchar cambios en localStorage para sincronizar en tiempo real
    window.addEventListener('storage', (e) => {
        if (e.key === 'tasks') {
            // Recargar todas las tareas si hay cambios
            list_el.innerHTML = '';
            totalTasks = 0;
            completedTasks = 0;
            loadTasksFromStorage();
        }
    });
});

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
        await fetch('http://localhost:8080/api/auth/logout', {
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
});
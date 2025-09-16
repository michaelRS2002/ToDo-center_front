export default function Tasks() {
    // Retorna el HTML
    const html = `
    <div class="search-card">
        <form class="search-form">
            <input type="text" class="search-input" placeholder="Buscar tarea por nombre..." />
            <button type="submit" class="search-btn">
                🔍
            </button>
        </form>
    </div>
    <div class="container">
        <div class="stats-container">
            <div class="details">
                <h1>Tareas Hechas</h1>
                <p>¡Tu puedes completar todos tus pendientes!</p>
                <div id="progressBar">
                    <div id="progress"></div>
                </div>
            </div>
            <div class="stats-numbers">
                <p id="numbers">0/0</p>
            </div>
        </div>
    </div>
    <div class="tittle-task">
        <h1>Tareas de Hoy</h1>
    </div>
    <section class="content tasksection">
        <div class="tasks-columns">
            <section class="task-list">
                <h1>Pendiente</h1>
                <div id="tasks-pending">
                    <!-- Las tareas se cargarán aquí dinámicamente -->
                </div>
            </section>
            <section class="task-list">
                <h1>En Proceso</h1>
                <div id="tasks-inprocess">
                    <!-- Las tareas se cargarán aquí dinámicamente -->
                </div>
            </section>
            <section class="task-list">
                <h1>Completado</h1>
                <div id="tasks-completed">
                    <!-- Las tareas se cargarán aquí dinámicamente -->
                </div>
            </section>
        </div>
    </section>
    <a href="/newtask" class="boton-fijo">+</a>
    `;

    // IMPORTANTE: Ejecutar el JavaScript después de que el HTML se monte
    setTimeout(() => {
        initializeTasksPage();
    }, 100);

    return html;
}

// Función que inicializa toda la funcionalidad de la página
function initializeTasksPage() {
    const list_el = document.querySelector("#tasks-pending");
    const completedListEl = document.getElementById("tasks-completed");
    const inprocessListEl = document.getElementById("tasks-inprocess");
    const searchInput = document.querySelector(".search-input");

    // Verificar que los elementos existan antes de continuar
    if (!list_el || !completedListEl || !inprocessListEl) {
        console.error('No se encontraron los contenedores de tareas');
        return;
    }

    // Crear mensaje "no resultados" para búsqueda
    let noResultsMsg = document.createElement("p");
    noResultsMsg.id = "no-results";
    noResultsMsg.textContent = "No se encontró ninguna tarea.";
    noResultsMsg.style.display = "none";
    noResultsMsg.style.textAlign = "center";
    noResultsMsg.style.color = "crimson";
    noResultsMsg.style.fontWeight = "bold";

    const taskSection = document.querySelector(".tasksection");
    if (taskSection) {
        taskSection.appendChild(noResultsMsg);
    }

    // Variables para estadísticas
    let totalTasks = 0;
    let completedTasks = 0;

    // Referencias del DOM para estadísticas
    const numbersEl = document.getElementById("numbers");
    const progressEl = document.getElementById("progress");

    // Función para actualizar estadísticas
    function updateStats() {
        if (numbersEl) {
            numbersEl.textContent = `${completedTasks}/${totalTasks}`;
        }

        const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        if (progressEl) {
            progressEl.style.width = percent + "%";

            if (percent < 50) {
                progressEl.style.background = "crimson";
            } else if (percent < 100) {
                progressEl.style.background = "orange";
            } else {
                progressEl.style.background = "limegreen";
            }
        }

        // Confetti cuando se completen todas las tareas
        if (completedTasks === totalTasks && totalTasks > 0) {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
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

    // Función para crear elemento de tarea
    function createTaskElement(taskData) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        task_el.setAttribute('data-task-id', taskData.id);

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskData.name;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_description_el = document.createElement('div');
        task_description_el.classList.add('description');

        const description_input_el = document.createElement('input');
        description_input_el.type = 'text';
        description_input_el.classList.add('text');
        const startTime12 = convertTo12Hour(taskData.start);
        const endTime12 = convertTo12Hour(taskData.end);
        description_input_el.value = `${startTime12} - ${endTime12}`;
        description_input_el.setAttribute('readonly', 'readonly');

        task_description_el.appendChild(description_input_el);

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

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_description_el);
        task_el.appendChild(task_actions_el);

        // Event listeners
        task_content_el.addEventListener('click', () => {
            task_content_el.classList.toggle('checked');
            task_input_el.classList.toggle('textchecked');

            if (task_content_el.classList.contains("checked")) {
                completedTasks++;
                completedListEl.appendChild(task_el);
                updateTaskStatusInStorage(taskData.id, "completed");
            } else {
                completedTasks--;
                list_el.appendChild(task_el);
                updateTaskStatusInStorage(taskData.id, "pending");
            }
            updateStats();
        });
        task_edit_el.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se active el click de la tarea
            
            // Redirigir a la página de edición con el ID de la tarea
            window.location.href = `/editask/${taskData.id}`;
        });

        task_delete_el.addEventListener('click', () => {
            const confirmDelete = confirm(`🗑️ ¿Eliminar la tarea "${taskData.name}"?`);
            if (!confirmDelete) return;
            
            if (task_content_el.classList.contains("checked")) {
                completedTasks--;
            }
            totalTasks--;
            updateStats();
            
            deleteTaskFromStorage(taskData.id);
            task_el.remove();
        });

        return task_el;
    }

    // Funciones de localStorage
    function updateTaskStatusInStorage(taskId, newStatus) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function deleteTaskFromStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar tareas
    function loadTasks() {
        // Limpiar contenedores
        list_el.innerHTML = '';
        completedListEl.innerHTML = '';
        inprocessListEl.innerHTML = '';
        totalTasks = 0;
        completedTasks = 0;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(task => {
            const task_el = createTaskElement(task);
            const task_content_el = task_el.querySelector('.content');
            const task_input_el = task_el.querySelector('.text');

            if (task.status === "completed") {
                task_content_el.classList.add("checked");
                task_input_el.classList.add("textchecked");
                completedListEl.appendChild(task_el);
                completedTasks++;
            } else if (task.status === "inprocess") {
                inprocessListEl.appendChild(task_el);
            } else {
                list_el.appendChild(task_el);
            }

            totalTasks++;
        });

        updateStats();
        console.log(`Cargadas ${totalTasks} tareas`);
    }

    // Funcionalidad de búsqueda
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase().trim();
            const tasks = document.querySelectorAll(".task");

            let found = false;

            tasks.forEach(task => {
                const title = task.querySelector(".content .text")?.value?.toLowerCase() || "";
                const description = task.querySelector(".description .text")?.value?.toLowerCase() || "";

                if (title.includes(term) || description.includes(term)) {
                    task.style.display = "flex";
                    found = true;
                } else {
                    task.style.display = "none";
                }
            });

            if (!found && term !== "") {
                noResultsMsg.style.display = "block";
            } else {
                noResultsMsg.style.display = "none";
            }
        });
    }

    // Cargar tareas inicialmente
    loadTasks();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'tasks') {
            loadTasks();
        }
    });
}



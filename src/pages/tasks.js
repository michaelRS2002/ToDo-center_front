export default function Tasks() {
    return `
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
                <h1>Tareas Hechas</h3>
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
        <!-- 
        <form id="new-task-form">
            <input type="text" id="new-task-input" placeholder="Enter a new task">
            <input type="submit" id="new-task-submit" value="Add Task">
        </form>
        -->
    </div>
    <section class="content tasksection">
        <!--
        <section class="task-list">
            <h1>Task List</h1>
            <div id="tasks">
                <div class="task">
                    <div class="content">
                        <input type="text" class="text" value="Sample Task" readonly>
                    </div>
                    <div class="actions">
                        <button class="edit">Edit</button>
                        <button class="delete">
                        <i class="fas fa-trash"></i>
                        </button>
                    </div>

                </div>
                <div class="task">
                    <div class="content checked">
                        <input type="text" class="text textchecked" value="Sample Task 2" readonly>
                    </div>
                    <div class="description">
                            <input type="text" class="text" value="Description of the completed task" readonly>
                    </div>
                    <div class="actions">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            </div>
        </section>-->
        <div class="tasks-columns">
            <section class="task-list">
                <h1>Pendiente</h1>
                <div id="tasks-pending">
                    <!--
                     <div class="task">
                        <div class="content">
                            <input type="text" class="text" value="Sample Task" readonly>
                        </div>
                        <div class="description">
                            <input type="text" class="text" value="Description of the completed task" readonly>
                        </div>
                        <div class="actions">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </div>
                    </div>
                    -->
                </div>
            </section>
            <section class="task-list">
                <h1>En Proceso</h1>
                <div id="tasks-inprocess">
                    <!-- ... -->
                </div>
            </section>
            <section class="task-list">
                <h1>Completado</h1>
                <div id="tasks-completed">
                    <!-- ... -->
                </div>
            </section>
        </div>
    </section>
    <a href="/newtask" class="boton-fijo">+</a>
`;

}




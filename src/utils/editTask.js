document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("edit-task-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskId = form.dataset.id;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          name: document.getElementById("edit-task-name").value,
          description: document.getElementById("edit-task-desc").value,
          date: document.getElementById("edit-task-date").value,
          start: document.getElementById("edit-start-time").value,
          end: document.getElementById("edit-end-time").value,
          status: document.getElementById("edit-task-status").value,
        };
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("✅ Tarea actualizada con éxito");
    window.location.href = "/pages/main.js"; // 🔄 redirige a la página principal
  });
});

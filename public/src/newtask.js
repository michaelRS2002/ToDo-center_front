document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  console.log("Token retrieved:", token); // Verifica que el token se esté obteniendo correctamente
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = {
      name: document.getElementById("task-name").value,
      desc: document.getElementById("task-desc").value,
      date: document.getElementById("task-date").value,
      start: document.getElementById("start-time").value,
      end: document.getElementById("end-time").value,
      status: document.getElementById("task-status").value,
    };

    try {
      const response = await fetch('http://localhost:8080/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Task "${task.name}" created successfully!`);
        window.location.href = 'taskpage.html';
      } else {
        alert(data.message || 'Error al crear la tarea');
      }
    } catch (err) {
      alert('No se pudo conectar con el servidor.');
    }
  });
});
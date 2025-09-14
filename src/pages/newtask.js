export default function Newtask() {
  return `
  <div class="container-contact100">
		<div class="wrap-contact100">

        <h1>Informacion de Tarea</h1>
        
        <form id="task-form">
        <label>Titulo</label>
				<input class="input100" type="text" name="name" placeholder="Escriba el nombre de la tarea..." id="task-name" required>
        <label>Descripcion</label>
				<textarea class="input100" name="message" placeholder="Escriba de que se trata su tarea..." id="task-desc"></textarea>
        <div class="form-row">
            <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="task-date" required>
            </div>
            <div class="form-group">
            <label>Inicio</label>
            <input type="time" id="start-time" required>
            </div>
            <div class="form-group">
            <label>Fin</label>
            <input type="time" id="end-time" required>
            </div>
            <div class="form-group">
            <label>Estado de Tarea</label>
            <select id="task-status">
                <option value="pending" selected>Pendiente</option>
                <option value="inprocess">En Proceso</option>
                <option value="completed">Completado</option>
            </select>
            </div>
        </div>
          <button type="submit" class="create-btn">Crear Tarea</button>
        </form>

    </div>
	</div>
`;
}

export default function Examples() {
  return `
  <!-- Botones básicos -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-warning">Advertencia</button>
<button class="btn btn-danger">Peligro</button>

<!-- Botones outline -->
<button class="btn btn-outline-primary">Outline Primario</button>
<button class="btn btn-outline-warning">Outline Warning</button>
<button class="btn btn-outline-danger">Outline Peligro</button>

<!-- Diferentes tamaños -->
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grande</button>
<button class="btn btn-primary btn-xl">Extra Grande</button>

<!-- Botón de ancho completo -->
<button class="btn btn-primary btn-block">Ancho Completo</button>

<!-- Botón con estado de carga -->
<button class="btn btn-primary btn-loading">Cargando...</button>

<!-- Grupo de botones -->
<div class="btn-group">
  <button class="btn btn-outline-primary">Izquierda</button>
  <button class="btn btn-outline-primary">Centro</button>
  <button class="btn btn-outline-primary">Derecha</button>
</div>

<!-- Botones deshabilitados -->
<button class="btn btn-primary" disabled>Deshabilitado</button>
<button class="btn btn-outline-warning" disabled>Outline Deshabilitado</button>
   
  `;
}

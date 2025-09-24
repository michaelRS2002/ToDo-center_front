export default function Sitemap() {
    return `
    <main class="sitemap_main">
      <div>
        <a href="/">Pagina principal</a>
      </div>
      <div>
        <p>Cuenta:</p><br>
        <a href="/login">Iniciar sesión</a><br><br>
        <a href="/signup">Registrarse</a><br><br>
        <a href="/forgot-password">Cambiar contraseña</a> <br><br>
        <a href="/profile">Ver perfil</a><br><br>
        <a href="/profile/edit">Editar perfil</a>  
      </div>
      <div>
        <p>Tareas:</p><br>
        <a href ="/tasks">Página de tareas</a><br><br>
        <a href ="/newtask">Crear tarea</a>
      </div>
    </main>

    `;
}
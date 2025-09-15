export default function Navbar() {
  return `<div class="head">
        <div class="logo">
            <a href="#">
                <img src="/public/images/icon.png" alt="Logo">
            </a>
        </div>
        <nav class="navbar">
<<<<<<< Updated upstream
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign up</a>
=======
            <a href="/">Inicio</a>
            ${page === "tasks" || page === "newtask"? `<a href="/">Usario</a>` : `<a href="/login">Iniciar Sesión</a>`}
            ${page === "tasks" || page === "newtask"? `<a href="/">Cerrar Sesion</a>` : `<a href="/signup">Registrarse</a>`}
>>>>>>> Stashed changes
        </nav>
    </div>
  `;
}

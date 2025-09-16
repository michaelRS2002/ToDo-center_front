export default function Navbar() {
    const page = document.body.dataset.page;
    console.log(page)

  return `<div class="head">
        <div class="logo">
            <a href="#">
                <img src="/public/images/icon.png" alt="Logo">
            </a>
        </div>
        <nav class="navbar">
            <a href="/">Inicio</a>
            ${page === "tasks" || page === "newtask"? `<a href="/">Usuario</a>` : `<a href="/login">Iniciar Sesión</a>`}
            ${page === "tasks" || page === "newtask"? `<a href="/">Cerrar Sesion</a>` : `<a href="/signup">Registrarse</a>`}
        </nav>
    </div>
  `;
}

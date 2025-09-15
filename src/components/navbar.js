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
            ${page === "tasks" || page === "newtask"? `<a href="/">Usario</a>` : `<a href="/">Iniciar Sesión</a>`}
            ${page === "tasks" || page === "newtask"? `<a href="/">Cerrar Sesion</a>` : `<a href="/">Registrarse</a>`}
        </nav>
    </div>
  `;
}

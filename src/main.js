import { routes } from './pages/routes.js';
import Navbar from './components/navbar.js';


export function render(path) {
  const app = document.getElementById('app');
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  if (routes[path]) {
    app.innerHTML = routes[path]();

    if (path === "/newtask") {
      import("/utils/newtask.js")
        .then(module => module.default?.())
        .catch(err => console.error("Error cargando newtask.js:", err));
    }

  } else {
    app.innerHTML = '<h1>404</h1><p>Página no encontrada.</p>';
  }
}

function onNavClick(e) {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    window.history.pushState({}, '', path);
    render(path);
  }
}

window.addEventListener('popstate', () => render(window.location.pathname));
document.addEventListener('click', onNavClick);

// Navbar siempre fijo
document.getElementById('navbar').innerHTML = Navbar();

// Render inicial
render(window.location.pathname);

window.addEventListener("navigate", (e) => {
  const path = e.detail;
  window.history.pushState({}, "", path);
  render(path);
});


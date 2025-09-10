import { routes } from './pages/routes.js';
import Navbar from './components/navbar.js';

function render(path) {
  document.getElementById('app').innerHTML = routes[path] ? routes[path]() : '<h1>404</h1><p>Página no encontrada.</p>';
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

document.getElementById('navbar').innerHTML = Navbar();
render(window.location.pathname);
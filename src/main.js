import Navbar from './components/navbar.js';
import { routes } from './pages/routes.js';

// Renderiza la ruta: si existe en routes usa el componente JS (soporta async), si no intenta cargar el HTML correspondiente desde public organizado por módulos
async function render(path) {
  console.log('Renderizando ruta:', path);
  const app = document.getElementById('app');
  if (routes[path]) {
    // Soporta funciones síncronas y asíncronas en routes
    const result = routes[path]();
    app.innerHTML = result instanceof Promise ? await result : result;
    console.log('Ruta JS encontrada:', path);
    return;
  }
  // Si no hay ruta JS, intenta cargar el HTML correspondiente desde public organizado por módulos
  let htmlPath = path;
  if (htmlPath.endsWith('/')) htmlPath = htmlPath.slice(0, -1);
  if (htmlPath === '' || htmlPath === '/') htmlPath = '/index';
  try {
    // Busca /modulo/index.html
    let response = await fetch(`${htmlPath}/index.html`);
    if (!response.ok) {
      // Si no existe, intenta /modulo.html
      response = await fetch(`${htmlPath}.html`);
    }
    if (response.ok) {
      const html = await response.text();
      app.innerHTML = html;
      return;
    }
  } catch (e) {
    // Ignorar error y mostrar 404
  }
  app.innerHTML = '<h1>404</h1><p>Página no encontrada.</p>';
}

function onNavClick(e) {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    console.log('Navegando a:', e.target.getAttribute('href'));
    const path = e.target.getAttribute('href');
    window.history.pushState({}, '', path);
    console.log('Pushed state to history:', path);
    render(path);
  }
}

window.addEventListener('popstate', () => render(window.location.pathname));
document.addEventListener('click', onNavClick);

document.getElementById('navbar').innerHTML = Navbar();
render(window.location.pathname);
console.log('Aplicación inicializada en ruta:', window.location.pathname);
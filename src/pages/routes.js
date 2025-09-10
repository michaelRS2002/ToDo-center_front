import Home from './home.js';
export const routes = {
  '/': Home,
  '/login': async () => {
    const response = await fetch('/login/login.html');
    if (response.ok) {
      return await response.text();
    }
    return '<h1>404</h1><p>Página no encontrada.</p>';
  },

};

export default function Navbar() {
    // Check login status by token in localStorage
    const isLoggedIn = !!localStorage.getItem('token');

    // Navbar HTML
    let navLinks = '';
    if (isLoggedIn) {
        navLinks = `
            <a href="/">Inicio</a>
            <a href="/profile">Usuario</a>
            <a href="#" id="logout-link">Cerrar Sesión</a>
        `;
    } else {
        navLinks = `
            <a href="/login">Iniciar Sesión</a>
            <a href="/signup">Registrarse</a>
        `;
    }

    // Logo links to home
    const html = `<div class="head">
        <div class="logo">
            <a href="/" data-link>
                <img src="/images/icon.png" alt="Logo">
            </a>
        </div>
        <nav class="navbar">
            ${navLinks}
        </nav>
    </div>`;

    // Attach logout logic and SPA navigation after DOM insertion
    setTimeout(() => {
        const logout = document.getElementById('logout-link');
        if (logout) {
            logout.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = '/login';
            });
        }
        // SPA navigation for navbar links
        const nav = document.querySelector('.navbar');
        if (nav) {
            nav.addEventListener('click', function(e) {
                const a = e.target.closest('a[href]');
                if (a && a.getAttribute('href').startsWith('/') && !a.hasAttribute('id')) {
                    e.preventDefault();
                    window.history.pushState({}, '', a.getAttribute('href'));
                    if (window.render) {
                        window.render(window.location.pathname);
                    } else {
                        window.location.reload();
                    }
                }
            });
        }
    }, 0);

    return html;
}
export default function Navbar() {
    // Check login status by token in localStorage
    const isLoggedIn = !!localStorage.getItem('token');

    // Navbar HTML
    let navLinks = '';
    if (isLoggedIn) {
        const isHome = window.location.pathname === '/';
        navLinks = isHome
            ? `
                <a href="/tasks">Task</a>
                <a href="/profile">Usuario</a>
                <a href="#" id="logout-link">Cerrar Sesión</a>
            `
            : `
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
            logout.addEventListener('click', async function(e) {
                e.preventDefault();
                const token = localStorage.getItem('token');
                try {
                    await fetch('https://todo-center-back.onrender.com/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token ? `Bearer ${token}` : ''
                        }
                    });
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } catch (err) {
                    if (window.showPopup) {
                        window.showPopup('Error al cerrar sesión', 'error');
                    } else {
                        alert('Error al cerrar sesión');
                    }
                    // Do not remove token or redirect
                }
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


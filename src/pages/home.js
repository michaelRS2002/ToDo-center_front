/**
 * Home Component
 * ----------------
 * This function exports the main HTML structure of the ToDo-Center homepage.
 * It returns a string containing the different sections of the page: Header, Services, About, Opinions, and Contact.
 */
export default function Home() {
  return `
    <!-- HEADER: Encabezado principal con logo, eslogan y botón -->
    <header class="content header" id="header">
            <div class="icon">
                <a href="#">
                    <img src="public/images/todo ne.png" alt="icono">
                </a>
            </div>
            <p>Convierte tus ideas en acciones.</p>
            <a href="#sau" class="btn">Conoce más</a>
    </header>
    <!-- SECTION: Servicios / Productos -->
    <section class="content sau" id="sau">
            <h2 class="title">Servicios</h2>
            <p>En ToDo-center encontrarás una página que te ayudará a recordar tus obligaciones, ya que puedes crear y 
                organizar tus tareas en diferentes categorías dependiendo del progreso que hayas hecho en su cumplimiento.</p>

            <div class="box-container">
                <div class="box">
                    <i class="fas fa-book"></i>
                    <h3>Producto 1</h3>
                    <p>Gestión de tareas.</p>

                </div>

                <div class="box">
                    <i class="fas fa-pencil-alt"></i>
                    <h3>Producto 2</h3>
                    <p>Personalización de tareas.</p>

                </div>

                <div class="box">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>Producto 3</h3>
                    <p>Disponible desde cualquier dispositivo.</p>
                </div>
            </div>
    </section>
    <!-- SECTION: Acerca de la web -->
    <section class="content about" id ="about">
            <article class="contain">
                <h2 class="title">Acerca de nosotros</h2>
                <p>Nuestro objetivo principal es facilitar la productividad y organización personal o grupal, evitando olvidar tareas pendientes y permitiendo un seguimiento claro del progreso.</p>
                <a href="#contact" class="btn">Contáctanos</a>
            </article>
    </section>
    <!-- SECTION: Opiniones de clientes -->
    <section class="content opinion">
            <h2 class="title">Opiniones</h2>
            <p>Conoce algunas opiniones de nuestros clientes.</p>
            <div class="box-container2">
                <div class="box">
                    <img src="public/images/pic1.jpg" alt="">
                    <h3>Juan José</h3>
                    <p>Me ayudó mucho con mis tareas.</p>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>

                <div class="box">
                    <img src="public/images/pic2.jpg" alt="">
                    <h3>Ana Sofía</h3>
                    <p>Una página realmente genial para tareas.</p>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="box">
                    <img src="public/images/pic1.jpg" alt="">
                    <h3>Cristian Camilo</h3>
                    <p>Nunca he estado más organizado.</p>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
     </section>
     <!-- SECTION: Contacto-->
    <section class="content contact" id ="contact">
        <h2 class="title">Contacto</h2>
        <div class="footer-section">
            <div class="f-enlaces">
                <a href="#header">Inicio</a>
                <a href="#about">Acerca de</a>
                <a href="#sau">Servicios</a>
            </div>
        </div>
        <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <p class="copyright">© 2025 M3JD .INC  MAPA DEL SITIO</p>
    </section>`;
}

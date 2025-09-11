/**
 * Home Component
 * ----------------
 * This function exports the main HTML structure of the ToDo-Center homepage.
 * It returns a string containing the different sections of the page: Header, Services, About, Opinions, and Contact.
 */
export default function Home() {
  return `
    <!-- HEADER: Main header with logo, slogan, and button -->
    <header class="content header" id="header">
            <div class="icon">
                <a href="#">
                    <img src="public/images/todo ne.png" alt="icon">
                </a>
            </div>
            <p>Turn your ideas into actions.</p>
            <a href="#sau" class="btn">Learn more</a>
    </header>
    <!-- SECTION: Services / Products -->
    <section class="content sau" id="sau">
            <h2 class="title">Services</h2>
            <p>In ToDo-center you will find a page to help you remember your obligations, since you can create and 
                organize your tasks in different categories depending on the progress you have made in their completion.</p>

            <div class="box-container">
                <div class="box">
                    <i class="fas fa-book"></i>
                    <h3>Product 1</h3>
                    <p>Task management.</p>

                </div>

                <div class="box">
                    <i class="fas fa-pencil-alt"></i>
                    <h3>Product 2</h3>
                    <p>Task Customization.</p>

                </div>

                <div class="box">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>Product 3</h3>
                    <p>Available from any device.</p>
                </div>
            </div>
    </section>
    <!-- SECTION: About the web -->
    <section class="content about" id ="about">
            <article class="contain">
                <h2 class="title">About us</h2>
                <p>Our main objective is to facilitate personal or group productivity and organization, avoiding forgetting pending tasks and allowing clear monitoring of progress.</p>
                <a href="#contact" class="btn">Contact us</a>
            </article>
    </section>
    <!-- SECTION: Opinions if customers -->
    <section class="content opinion">
            <h2 class="title">opinions</h2>
            <p>Learn about some of our clients' options.</p>
            <div class="box-container2">
                <div class="box">
                    <img src="public/images/pic1.jpg" alt="">
                    <h3>Juan Jose</h3>
                    <p>It hel me a lot  with my taks.</p>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>

                <div class="box">
                    <img src="public/images/pic2.jpg" alt="">
                    <h3>Ana Sofia</h3>
                    <p>A really nice web for taks.</p>
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
                    <p>I have never be more tidy.</p>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
     </section>
     <!-- SECTION: Contact-->
    <section class="content contact" id ="contact">
        <h2 class="title">Contact</h2>
        <div class="footer-section">
            <div class="f-enlaces">
                <a href="#header">Home</a>
                <a href="#about">About</a>
                <a href="#sau">Services</a>
            </div>
        </div>
        <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <p class="copyright">© 2025 TODO CENTER</p>
    </section>`;
}

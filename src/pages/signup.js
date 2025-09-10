export default function Signup() {
  return `
    <main class="flex_signup">
      <div class="div_form">
        <h1>
          Registrarse
        </h1>
        <div class="form_inputs">
          <input type="text" name="nombres" placeholder="Nombres">
          <input type="text" name="apellidos" placeholder="Apellidos">
          <input type="number" name="edad" placeholder="Edad" inputmode="numeric" pattern="[0-9]*" onkeydown="if(event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') event.preventDefault();">
          <input type="email" name="correo" placeholder="ejemplo@gmail.com">
          <input type="password" name="contrasena" placeholder="Contraseña">
          <input type="password" name="confirmarContrasena" placeholder="Confirmar contraseña">
        </div>
        <div class="submit_button">
          <input type="submit" value="Crear cuenta">
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width="300rem" height="auto">
      </div>
      <footer>
        <a href="./sitemap.html">Sitemap</a>
      </footer>
    </main>
  `;
}

export default function Rese() {
    return `
    <main class="fpassword_main">
      <div class="div_form">
        <h1>
          Cambiar contraseña
        </h1>
        <div class="form_inputs">
          <label class="label label-required">Contraseña</label>
          <input type="password" name="new_password" placeholder="******" class="input">
          <label class="label label-required">Confirmar contraseña</label>
          <input type="password" name="com_password" placeholder="Confirmar contraseña" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" type="submit" value="Guardar contraseña">
        </div>
      </div>
      <div class="div_logo">
        <img src="/public/images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="sitemap.html">Sitemap</a> 
    </footer>
    </main>
    `;
}
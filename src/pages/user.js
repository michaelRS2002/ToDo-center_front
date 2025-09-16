export default function User() {
 return   `
<body>
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Datos del usuario
        </h1>
        <div class="form_inputs">
          <label class="label">Nombre</label>
          <input type="text" name="names" readonly placeholder="Names" class="input">
          <label class="label">Apellido</label>
          <input type="text" name="surnames" readonly  placeholder="Surname" class="input">
          <label class="label">Edad</label>
          <input type="number" name="age" readonly  placeholder="Age" class="input">
          <label class="label">Correo electrónico</label>
          <input type="email" name="email" readonly  placeholder="example@gmail.com" class="input">
          <label class="label">Miembro desde</label>
          <input type="text" name="member_since" readonly  placeholder="8 years" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" onClick="window.location.href='/profile/edit'" type="submit" value="Editar perfil">
          <input class="btn btn-primary" onClick="window.location.href='/profile/delete'" type="submit" value="Eliminar perfil">
        </div>
      </div>
      <div class="div_logo">
        <img src="./images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="/sitemap">Sitemap</a>
    </footer>
    </main>
  </body>
    `
    ;
}
export default function UserEdit() {
 return   `
    <body>
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Ingrese sus nuevos datos
        </h1>
        <div class="form_inputs">
          <label class="label">Nombre</label>
          <input type="text" name="names" placeholder="Names" class="input">
          <label class="label">Apellido</label>
          <input type="text" name="surnames" placeholder="Surname" class="input">
          <label class="label">Edad</label>
          <input type="number" name="age" placeholder="Age" class="input">
          <label class="label">Email</label>
          <input type="email" name="email" placeholder="example@gmail.com" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" type="submit" value="Guardar datos">
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
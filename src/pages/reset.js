export default function Rese() {
    return `
    <main class="fpassword_main">
      <div class="div_form">
        <h1>
          Change password
        </h1>
        <div class="form_inputs">
          <input type="password" name="new_password" placeholder="New password" class="input">
          <input type="password" name="com_password" placeholder="Confirm password" class="input">
        </div>
        <div class="submit_button">
          <input class="btn btn-primary" type="submit" value="Save password">
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
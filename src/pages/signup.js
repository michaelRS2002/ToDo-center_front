export default function Signup() {
  return `
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Sign up
        </h1>
        <div class="form_inputs">
          <input type="text" name="names" placeholder="Names">
          <input type="text" name="surnames" placeholder="Surname">
          <input type="number" name="age" placeholder="Age">
          <input type="email" name="email" placeholder="example@gmail.com">
          <input type="password" name="password" placeholder="Password">
          <input type="password" name="cpassword" placeholder="Confirm password">
        </div>
        <div class="submit_button">
          <input type="submit" value="Create account">
        </div>
      </div>
      <div class="div_logo">
        <img src="public/images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="sitemap.html">Sitemap</a> 
    </footer>
    </main>
  `;
}

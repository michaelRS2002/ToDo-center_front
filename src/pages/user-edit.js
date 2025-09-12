export default function UserEdit() {
 return   `
    <body>
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Modify your data here
        </h1>
        <div class="form_inputs">
          <input type="text" name="names" placeholder="Names">
          <input type="text" name="surnames" placeholder="Surname">
          <input type="number" name="age" placeholder="Age">
          <input type="email" name="email" placeholder="example@gmail.com">
        </div>
        <div class="submit_button">
          <input type="submit" value="Save data">
        </div>
      </div>
      <div class="div_logo">
        <img src="/public/images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="sitemap.html">Sitemap</a> 
    </footer>
    </main>
  </body>
 `
 ;
}
export default function User() {
 return   `
<body>
    <main class="signup_main">
      <div class="div_form">
        <h1>
          Your user data
        </h1>
        <div class="form_inputs">
          <input type="text" name="names" readonly placeholder="Names">
          <input type="text" name="surnames" readonly  placeholder="Surname">
          <input type="number" name="age" readonly  placeholder="Age">
          <input type="email" name="email" readonly  placeholder="example@gmail.com">
          <input type="text" name="member_since" readonly  placeholder="Member since: 8 years">
        </div>
        <div class="submit_button">
          <input onClick="window.location.href='/profile/edit'" type="submit" value="Edit profile">
          <input onClick="window.location.href='/profile/delete'" type="submit" value="Delete profile">
        </div>
      </div>
      <div class="div_logo">
        <img src="public/images/logo.png" width= "300rem" height="auto">
      </div>
    
    <footer>
      <a href="sitemap.html">Sitemap</a> 
    </footer>
    </main>
  </body>
    `
    ;
}
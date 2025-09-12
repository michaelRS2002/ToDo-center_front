export default function Sitemap() {
    return `
    <main class="sitemap_main">
      <div>
        <a href="/">Main page</a>
      </div>
      <div>
        <p>Account:</p><br>
        <a href="/login">Login</a><br><br>
        <a href="/signup">Sign up</a><br><br>
        <a href="/fpassword">Change password</a> 
      </div>
      <div>
        <p>Tasks:</p><br>
        <a href ="">Task page</a><br><br>
        <a href ="">Create task</a>
      </div>
    </main>

    <footer>
      <a>M3JD .INC</a>
   </footer>
    `;
}
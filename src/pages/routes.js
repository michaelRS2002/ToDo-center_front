import Home from './home.js';
import Login from './login.js';
import Signup from './signup.js';
import Fpassword from './fpassword.js';
<<<<<<< Updated upstream
import Sitemap from './sitemap.js'
=======
import Sitemap from './sitemap.js';
import User from './user.js';
import UserEdit from './user-edit.js';
import Tasks from './tasks.js';
import Newtask from './newtask.js';
import Editask from './editask.js';
import Reset from './reset.js';
>>>>>>> Stashed changes
import Examples from './examples.js';
export const routes = {

  '/': Home,
  '/login': Login,
  '/signup': Signup,
  '/forgot-password': Fpassword,
  '/sitemap': Sitemap,
<<<<<<< Updated upstream
=======
  '/profile': User,
  '/profile/edit': UserEdit,
  '/tasks': Tasks,
  '/newtask': Newtask,
  '/editask': Editask,
  //Esta no es la ruta definitiva, solo es para ver el diseño
  '/reset': Reset,
>>>>>>> Stashed changes
  '/examples': Examples,
};

import Home from './home.js';
import Login from './login.js';
import Signup from './signup.js';
import Fpassword from './fpassword.js';
import Sitemap from './sitemap.js'
import User from './user.js';
import UserEdit from './user-edit.js';
import Reset from './reset.js';
export const routes = {

  '/': Home,
  '/login': Login,
  '/signup': Signup,
  '/forgot-password': Fpassword,
  '/sitemap': Sitemap,
  '/profile': User,
  '/profile/edit': UserEdit,
  //Esta no es la ruta definitiva, solo es para ver el diseño
  '/reset': Reset
};

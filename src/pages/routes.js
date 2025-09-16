import Home from './home.js';
import Login from './login.js';
import Signup from './signup.js';
import Fpassword from './fpassword.js';
import Sitemap from './sitemap.js'
import Tasks from './tasks.js';
import User from './user.js';
import UserEdit from './user-edit.js';
import Newtask from './newtask.js';
import Editask from './editask.js';
import Reset from './reset.js';
import Examples from './examples.js';
export const routes = {

  '/': Home,
  '/login': Login,
  '/signup': Signup,
  '/forgot-password': Fpassword,
  '/sitemap': Sitemap,
  '/profile': User,
  '/profile/edit': UserEdit,
  '/tasks': Tasks,
  '/newtask': Newtask,
  '/reset': Reset,
  '/editask': Editask,
  '/examples': Examples,
};

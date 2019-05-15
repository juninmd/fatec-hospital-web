import { RouteProps } from 'react-router-dom';
import Poema from '../containers/poema';
import Usuario from '../containers/usuario';
import PoemaList from '../containers/poema-list';
import UsuarioList from '../containers/usuario-list';

const publicUrl = process.env.PUBLIC_URL;

export const routes: RouteProps[] = [
  { path: `${publicUrl}/poema/:id`, component: Poema },
  { path: `${publicUrl}/poema-list`, component: PoemaList, exact: true },
  { path: `${publicUrl}/usuario/:id`, component: Usuario },
  { path: `${publicUrl}/usuario-list`, component: UsuarioList, exact: true },
];
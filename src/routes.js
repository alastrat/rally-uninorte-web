import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Cards = React.lazy(() => import('./views/Base/Cards'));
const Registro = React.lazy(() => import('./views/Base/Registro-estudiante'));
const Buscar = React.lazy(() => import('./views/Base/Buscar-estudiante'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/registro-estudiante', name: 'Registro', component: Registro },
  { path: '/buscar-estudiante', name: 'Buscar', component: Buscar },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;

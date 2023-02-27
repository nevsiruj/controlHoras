import { createWebHistory, createRouter } from 'vue-router';
import Caja from './components/caja/Caja.vue';
import AbrirCaja from './components/caja/AbrirCaja.vue';
import FormLavado from './components/lavado/FormLavado.vue';
import ListLavado from './components/lavado/ListLavado.vue';
import Dashboard from './components/admin/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Caja',
    component: Caja,
  },
  // {
  //   path: '/caja',
  //   name: 'CajaHome',
  //   component: CajaHome,
  // },
  {
    path: '/abrircaja',
    name: 'AbrirCaja',
    component: AbrirCaja,
  },
  {
    path: '/formlavado',
    name: 'FormLavado',
    component: FormLavado,
  },
  {
    path: '/listlavado',
    name: 'ListLavado',
    component: ListLavado,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

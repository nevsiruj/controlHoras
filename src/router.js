import { createWebHistory, createRouter } from 'vue-router';
import EmployeeSchedule from './components/caja/EmployeeSchedule.vue';
import EmployeeCard from './components/caja/EmployeeCard.vue';
import EmployeeList from './components/caja/EmployeeList.vue';
import EmployeeAcces from './components/caja/EmployeeAcces.vue';
import FormLavado from './components/lavado/FormLavado.vue';
import ListLavado from './components/lavado/ListLavado.vue';
import Dashboard from './components/admin/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'EmployeeAcces',
    component: EmployeeAcces,
  },
  {
    path: '/EmployeeList',
    name: 'EmployeeList',
    component: EmployeeList,
  },
  {
    path: '/EmployeeCard',
    name: 'EmployeeCard',
    component: EmployeeCard,
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

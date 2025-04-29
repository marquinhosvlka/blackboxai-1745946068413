import { createRouter, createWebHistory } from 'vue-router';

import Store from '../components/Store.vue';
import Products from '../components/Products.vue';
import Sales from '../components/Sales.vue';
import Inventory from '../components/Inventory.vue';
import Reports from '../components/Reports.vue';

const routes = [
  { path: '/', redirect: '/store' },
  { path: '/store', component: Store },
  { path: '/products', component: Products },
  { path: '/sales', component: Sales },
  { path: '/inventory', component: Inventory },
  { path: '/reports', component: Reports },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

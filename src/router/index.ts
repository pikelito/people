import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/people',
  },
  {
    path: '/people',
    name: 'people-list',
    component: () => import('@/modules/people/pages/PeopleListPage.vue'),
  },
  {
    path: '/people/:id',
    name: 'people-detail',
    component: () => import('@/modules/people/pages/PersonDetailPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

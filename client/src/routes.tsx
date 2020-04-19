import { lazy } from 'react';

import { RouteConfig } from './types/common';

const Dashboard: any = lazy((): Promise<any> => import('./containers/App/Dashboard'));
const Profile: any = lazy((): Promise<any> => import('./containers/App/Profile'));

const routes: RouteConfig[] = [
  { path: '/app/dashboard', exact: false, name: 'Dashboard', component: Dashboard },
  { path: '/app/profile', exact: false, name: 'Profile', component: Profile },
];

export default routes;

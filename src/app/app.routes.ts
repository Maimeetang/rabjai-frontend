import { Routes } from '@angular/router';
import { Liff } from './liff/liff';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'liff',
    component: Liff,
  },
];

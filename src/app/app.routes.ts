import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Liff } from './liff/liff';
import { Home } from './home/home';
import { LiffLayout } from './liff/layout/liff-layout';
import { Summary } from './liff/summary/summary';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'liff',
    pathMatch: 'full',
    component: Liff,
  },
  {
    path: 'liff',
    canActivate: [authGuard],
    component: LiffLayout,
    children: [
      {
        path: 'summary',
        component: Summary,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

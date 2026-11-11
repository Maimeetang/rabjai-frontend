import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Liff } from './liff/liff';
import { Home } from './home/home';
import { LiffLayout } from './liff/layout/liff-layout';
import { Summaries } from './liff/summaries/summaries';
import { Placeholder } from './components/placeholder/placeholder';
import { Transactions } from './liff/transactions/transactions';

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
    path: 'liff/:accountId',
    canActivate: [authGuard],
    component: LiffLayout,
    children: [
      {
        path: 'summaries',
        component: Placeholder,
      },
      {
        path: 'transactions',
        component: Transactions,
      },
      {
        path: 'categories',
        component: Placeholder,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

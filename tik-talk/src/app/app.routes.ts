import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Layout } from './common-ui/layout/layout';

export const routes: Routes = [
  {
    path: '', component: Layout, children: [
      { path: 'profile', component: ProfilePage },
      { path: '', component: SearchPage },
    ]
  },
  { path: 'login', component: LoginPage },
];

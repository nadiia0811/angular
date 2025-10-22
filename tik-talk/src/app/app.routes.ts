import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Layout } from './common-ui/layout/layout';
import { canActivateAuth } from './auth/auth.guard';
import { SettingsPage } from './pages/settings-page/settings-page';

export const routes: Routes = [
  {
    path: '', component: Layout, children: [
      { path: 'profile/:id', component: ProfilePage },
      { path: 'search', component: SearchPage },
      { path: 'settings', component: SettingsPage}
    ],
    canActivate: [canActivateAuth]
  },
  { path: 'login', component: LoginPage },
];

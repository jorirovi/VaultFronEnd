import { Routes } from '@angular/router';
import { LoginComponent } from './Domains/login/login.component';
import { VaultComponent } from './Domains/vault/vault.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'vaultForm',
    component: VaultComponent
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'signIn',
        loadChildren: () =>
          import('./components/sign-in/sign-in.module').then(
            (m) => m.SignInModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./components/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: '',
        redirectTo: 'signIn',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

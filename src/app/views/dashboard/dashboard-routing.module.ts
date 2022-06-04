import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./../cards/cards.module').then((m) => m.CardsModule),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./../appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'movements',
        loadChildren: () =>
          import('./../movements/movements.module').then(
            (m) => m.MovementsModule
          ),
      },
      {
        path: 'movements/:cardId',
        loadChildren: () =>
          import('./../movements/movements.module').then(
            (m) => m.MovementsModule
          ),
      },
      {
        path: 'transfer',
        loadChildren: () =>
          import('./../transfer/transfer.module').then((m) => m.TransferModule),
      },
      {
        path: 'taxes',
        loadChildren: () =>
          import('../taxes/taxes.module').then((m) => m.TaxesModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

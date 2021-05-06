import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteListComponent } from '../app/components/cliente-list/cliente-list.component';
import { InsertClComponent } from './components/insert-cl/insert-cl.component';

const routes: Routes = [
  {path: 'home', component: ClienteListComponent},
  {path: 'registrar', component: InsertClComponent},
  {path: '**', component: ClienteListComponent}
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

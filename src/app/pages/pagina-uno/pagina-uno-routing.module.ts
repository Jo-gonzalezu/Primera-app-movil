import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaUnoPage } from './pagina-uno.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaUnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaUnoPageRoutingModule {}

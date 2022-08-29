import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaDosPage } from './pagina-dos.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaDosPageRoutingModule {}

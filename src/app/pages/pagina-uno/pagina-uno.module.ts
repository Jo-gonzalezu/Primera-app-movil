import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaUnoPageRoutingModule } from './pagina-uno-routing.module';

import { PaginaUnoPage } from './pagina-uno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaUnoPageRoutingModule
  ],
  declarations: [PaginaUnoPage]
})
export class PaginaUnoPageModule {}

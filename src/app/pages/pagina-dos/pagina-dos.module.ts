import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaDosPageRoutingModule } from './pagina-dos-routing.module';

import { PaginaDosPage } from './pagina-dos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaDosPageRoutingModule
  ],
  declarations: [PaginaDosPage]
})
export class PaginaDosPageModule {}

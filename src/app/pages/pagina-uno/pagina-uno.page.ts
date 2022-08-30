import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-pagina-uno',
  templateUrl: './pagina-uno.page.html',
  styleUrls: ['./pagina-uno.page.scss'],
})
export class PaginaUnoPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';

  constructor(private toastController: ToastController,
              private router: Router,
              private db: DbService) { }

  ngOnInit() {
  }

  ingresar() {
    if(!this.db.validarCredenciales(this.mdl_user, this.mdl_pass)) {
      
    }
  }

  validarCredenciales(){
    console.log('Se ha hecho click en el botón');
    if (this.mdl_user == "admin" && this.mdl_pass == "admin") {
      this.router.navigate(['pagina-dos']);
    }
  }

  async presentToast() {
    
  }
}

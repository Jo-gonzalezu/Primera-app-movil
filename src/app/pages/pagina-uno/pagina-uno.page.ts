import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-pagina-uno',
  templateUrl: './pagina-uno.page.html',
  styleUrls: ['./pagina-uno.page.scss'],
})
export class PaginaUnoPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';
  act_pass: string = 'admin';
  new_pass: string = '';
  constructor(private toastController: ToastController,
              private alertController: AlertController,
              private router: Router,
              private db: DbService) { }

  ngOnInit() {
  }

  ingresar() {
    if(!this.db.validarCredenciales(this.mdl_user, this.mdl_pass)) {
      this.mostrarMensaje('Credenciales erroneas')
    }
    else{
      this.mostrarToast('Bienvenido '+this.mdl_user);
    }
  }


  validarCredenciales(){
    console.log('Se ha hecho click en el botón');
    if (this.mdl_user == "admin" && this.mdl_pass == this.new_pass) {
      this.router.navigate(['pagina-dos']);
    }
  }
  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }
  async mostrarMensaje(mensaje) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }


}

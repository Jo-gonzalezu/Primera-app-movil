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
  md1_verifi: string ='verifica';
  constructor(private toastController: ToastController,
              private alertController: AlertController,
              private router: Router,
              private db: DbService) { }

  ngOnInit() {
  }
  act_pass: string = 'admin';


  ingresar() {
    console.log(this.act_pass)
    if(!this.db.validarCredenciales(this.mdl_user, this.mdl_pass,this.act_pass)) {
      this.mostrarMensaje('Credenciales erroneas')
    }
    else{
      this.mostrarToast('Bienvenido '+this.mdl_user);
    }
    
  }
  async cambioPass() {
    const alert = await this.alertController.create({
      header: 'Cambiar contraseña',
      inputs: [
        {
          placeholder: 'Codigo de verificacion',
          name: 'codigoverifica',
          id: 'codigoverifica',
        },
        {
          placeholder: 'Nueva contraseña',
          name: 'nuevapass',
          id:'nuevapass',
          type: 'text', 
        }
      ],
      buttons: [{
       text: 'ok', handler:(res) =>{
        if(res.codigoverifica == this.md1_verifi){
          this.act_pass= res.nuevapass,
          console.log(this.act_pass);
        }
        else{
          this.mostrarToast('codigo verificacion erroneo')
        }
       }
      },
      {
        text:'Cancelar'
      }  
      
      ],
    });
    await alert.present();
  }
  validarCredenciales(){
    if (this.mdl_user == "admin" && this.mdl_pass == this.act_pass) {
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

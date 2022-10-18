import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
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
              private db: DbService,
              private animationCtrl: AnimationController,
              ) { }

  ngOnInit() {
    const squareA = this.animationCtrl.create()
    .addElement(document.querySelector('.animado'))
    .fill('none')
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]).play();

    const squareB = this.animationCtrl.create()
    .addElement(document.querySelector('.animado2'))
    .fill('none')
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]).play();


  }
  act_pass: string = 'admin';


  ingresar() {
    console.log(this.act_pass)
    if(!this.db.validarCredenciales(this.mdl_user, this.mdl_pass,this.act_pass)) {
      this.mostrarMensaje('Credenciales erroneas');
    }
    else{
      this.mostrarToast('Bienvenido '+this.mdl_user);
      let extras: NavigationExtras = {
        state: {
          usuario: this.mdl_user,
          cualquierCosa: 'Cualquier valor'
        }
      }
      this.router.navigate(['pagina-dos'], extras);
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
          type: 'password', 
        }
      ],
      buttons: [{
        text: 'ok', handler:(res) =>{
          if(res.codigoverifica == this.md1_verifi){
            this.act_pass= res.nuevapass,
            console.log(this.act_pass);
          }
          else{
            this.mostrarToast('Codigo de verificación erroneo.');
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
      duration: 3000
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

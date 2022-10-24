import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, IonModal, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-uno',
  templateUrl: './pagina-uno.page.html',
  styleUrls: ['./pagina-uno.page.scss'],
})
export class PaginaUnoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  usuario = new FormGroup({

    email: new FormControl('', [Validators.email, Validators.required]),
    nombre: new FormControl('',[Validators.required, Validators.minLength(4)]),
    apellido: new FormControl('',[Validators.required, Validators.minLength(4)]),
    password: new FormControl('',[Validators.required]),

  });
  mdl_user: string = '';
  mdl_pass: string = '';
  md1_verifi: string ='verifica';
  mdl_nomb: string = '';
  mdl_apell: string = ''; 
  mdl_rut: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_sueldo: string = '';
  lista_personas = [];
  passreult: string ='';
  constructor(private toastController: ToastController,
              private alertController: AlertController,
              private router: Router,
              private db: DbService,
              private animationCtrl: AnimationController
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


  ingresar() {
    if(!this.db.buscaruser(this.mdl_user, this.mdl_pass)) {
      this.mostrarMensaje('Credenciales erroneas');
    }
    else{
      this.mostrarToast('Sesión iniciada como "'+this.mdl_user+'"');
      let extras: NavigationExtras = {
        state: {
          usuario: this.mdl_user,
          cualquierCosa: 'Cualquier valor'
        }
      }
      this.router.navigate(['pagina-dos'], extras);
    }
  }
  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success'
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

  almacenar(res) {
    this.db.almacenarPersona(this.mdl_rut, this.mdl_nombre, 
      this.mdl_apellido, this.mdl_sueldo);
    console.log('FSR: PERSONA CREADA OK')
    this.modal.dismiss(null, 'cancel');

      
  }

  navegar() {
    this.router.navigate(['seleccion']);
  }
  atras(){
    this.modal.dismiss(null, 'cancel');
      
    }


  }
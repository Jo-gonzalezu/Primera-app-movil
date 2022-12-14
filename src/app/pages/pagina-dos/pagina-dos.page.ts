import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-dos',
  templateUrl: './pagina-dos.page.html',
  styleUrls: ['./pagina-dos.page.scss'],
})
export class PaginaDosPage implements OnInit {

  mdl_user: string = '';
  lista_personas = [];
  texto: string = '';
  mdl_idclase: string = '';

  constructor(private router: Router,
              private db: DbService,
              private api: ApiService,
              private loadingController: LoadingController,
              private toastController: ToastController) { }

  ngOnInit() {
    try {
      this.mdl_user = this.router.getCurrentNavigation().extras.state.usuario;
      this.listar();
    } catch (error) {
      this.router.navigate(['pagina-uno']);
    }
  }

  listar() {
    let that = this;
    this.lista_personas = [];

    this.db.listarPersonas().then(data => {
      for(let i = 0; i < data.rows.length; i++) {
        let persona = data.rows.item(i);

        that.lista_personas.push(persona);
      }
    })
  }

  buscar() {
    let that = this;
    this.lista_personas = [];

    this.db.buscarPersonas(this.mdl_user).then(data => {
      for(let x=0; x < data.rows.length; x++) {
        let persona = data.rows.item(x);

        that.lista_personas.push(persona);
        
      }
    })
  }

  eliminar(email) {
    this.db.eliminarPersona(email);
    this.listar();
  }

  async leerQR() {
    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      let string_completo = result.content
      let simbolo = string_completo.indexOf("|");
      let conSubstr = string_completo.substr(simbolo, 145);  /* Extracci??n de car??cteres despues del | */
      this.texto = conSubstr

    }
    document.querySelector('body').classList.remove('scanner-active');
  };


  /*traer el mdl_asignatura y el id_clase previo a esto*/
  async obtenerAsignatura() {
    let that = this;

      let data = await that.api.registrarAsistencia(
        that.mdl_user, that.mdl_idclase);

      if (data['result'][0].RESPUESTA === 'OK') {
        that.mostrarMensaje('Persona Almacenada Correctamente')
      } else {
        that.mostrarMensaje('ERR03');
      }
    }
    

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

}

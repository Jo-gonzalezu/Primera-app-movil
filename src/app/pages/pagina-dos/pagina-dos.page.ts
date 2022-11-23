import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-pagina-dos',
  templateUrl: './pagina-dos.page.html',
  styleUrls: ['./pagina-dos.page.scss'],
})
export class PaginaDosPage implements OnInit {

  mdl_nombre: string = '';
  mdl_idclase: string = '';
  lista_personas = [];
  texto: string = '';

  constructor(private router: Router,
              private db: DbService) { }

  ngOnInit() {
    try {
      this.mdl_nombre = this.router.getCurrentNavigation().extras.state.usuario;
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

    this.db.buscarPersonas(this.mdl_nombre).then(data => {
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
      let conSubstr = string_completo.substr(simbolo, 145);  /* Extracción de carácteres despues del | */
      this.texto = conSubstr
    }
    document.querySelector('body').classList.remove('scanner-active');
  };




}

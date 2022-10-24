import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-pagina-dos',
  templateUrl: './pagina-dos.page.html',
  styleUrls: ['./pagina-dos.page.scss'],
})
export class PaginaDosPage implements OnInit {

  mdl_nombre: string = '';
  lista_personas = [];

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

  eliminar(rut) {
    this.db.eliminarPersona(rut);
    this.listar();
  }
}

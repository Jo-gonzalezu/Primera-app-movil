import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-dos',
  templateUrl: './pagina-dos.page.html',
  styleUrls: ['./pagina-dos.page.scss'],
})
export class PaginaDosPage implements OnInit {

  mdl_user: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    try {
      this.mdl_user = this.router.getCurrentNavigation().extras.state.usuario;
    } catch (error) {
      this.router.navigate(['pagina-uno']);
    }
  }
  
}

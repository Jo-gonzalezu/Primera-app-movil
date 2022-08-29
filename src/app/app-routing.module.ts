import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from './services/db.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-uno',
    pathMatch: 'full'
  },
  {
    path: 'pagina-uno',
    redirectTo: 'pagina-uno',
    pathMatch: 'full'
  },
  {
    path: 'pagina-dos',
    redirectTo: 'pagina-dos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'pagina-uno',
    loadChildren: () => import('./pages/pagina-uno/pagina-uno.module').then( m => m.PaginaUnoPageModule)
  },
  {
    path: 'pagina-dos',
    loadChildren: () => import('./pages/pagina-dos/pagina-dos.module').then( m => m.PaginaDosPageModule),canActivate: [DbService]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

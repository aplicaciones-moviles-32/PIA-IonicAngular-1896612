import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { RegistroComponent } from './registro/registro.component';
//import { MapaComponent } from './mapa/mapa.component'; Se cancela la implementacion
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
const routes: Routes = [
  
  //Mostrar el feed primero
  { path: 'feed', component: FeedComponent }, 
  
  //{ path: 'mapa', component: MapaComponent }, Se cancela la implementación, el API es de paga 
  { path: 'post', component: PostComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'publicacion/:idPost', component: PublicacionComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'editar', component: EditarPerfilComponent},
  { path: '**', component: FeedComponent },//Forma en la que se mostrará el Feed primero, pero 
  //por las diferentes condiciones, se mostrará el logIn en caso de no tener la cuenta activa
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
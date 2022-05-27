import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../services/db-service.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  constructor(private http: HttpClient, private db: DbServiceService,private authService: AuthenticationService) { }
  ngOnInit(): void {
    //Cabe aclarar que solo las publicaciones que el usuario postea se cargarán 
    //Si se crea un usuario y ya hay 5 fotos, solo la foto que posteará 
    //el nuevo usuario aparecerá en su perfil
    this.cargarFeedEnPerfil();
  }

  userLogged=this.authService.getULo();

  publicaciones : any = [];
  posts: any = [];
  tester : any = [];
  
  filtro : string = '';
  
  activo = 'grid';

  cargarFeedEnPerfil() {
    this.db.obtenerPublicacionesFeed()
    .subscribe(resp => {
      console.log(resp);
      this.tester = Object.values(resp);
      console.log(this.tester); //Para ver si obtiene los objetos
      for(let test of this.tester){
        if(test != null){
          this.posts = this.posts.concat(test);
        }
      }
      this.posts.reverse();
    })
   

   }

  toggleActivo(activo: string):void {
    this.activo = activo;
  }

}
{}
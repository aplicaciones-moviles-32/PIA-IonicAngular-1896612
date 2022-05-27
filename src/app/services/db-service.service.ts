import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; //Conexción Firebase para facilitar la URL

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient) { }

  //Obtener detalles

  //Obtener info de las publicaciones
  obtenerPublicacionesFeed(): any {
    return this.http.get(environment.firebase.databaseURL + '/publicaciones.json')
  }
  //Obtener los datos del usuario
  getDatosUsuario(): any {
    return this.http.get(environment.firebase.databaseURL + '/usuario.json')
  }
  //Obtener la bibloteca de fotos del usuario
  getPublicacionesUsuario(): any {
    return this.http.get(environment.firebase.databaseURL + '/usuario/publicaciones.json')
  }

  //Publicaciones detalladas del usuarios
  obtenerDetalleDePublicacion(id: string): any {
    console.log(environment.firebase.databaseURL + '/publicaciones/'+ id +'.json');
    console.log(this.http.get(environment.firebase.databaseURL + '/publicaciones/'+ id +'.json'));
    return this.http.get(environment.firebase.databaseURL + '/publicaciones/'+ id +'.json')
  }

   //Eliminar publicación
   eliminarPublicacion(id: number){
    console.log(environment.firebase.databaseURL + "/publicaciones/"+ id.toString() + ".json");
    return this.http.delete(environment.firebase.databaseURL + '/publicaciones/'+ id.toString() + '.json')
  }

  //Publicar una publicación
  publicarPublicacion(post: any) {
    return this.http.post(environment.firebase.databaseURL + '/publicaciones.json', post)
  }

  //Modificar
  actualizarPublicacion(id: number, nuevosDatos: any) {
    return this.http.put(environment.firebase.databaseURL + '/publicaciones/'+ id.toString() +'.json', nuevosDatos)
  }

}

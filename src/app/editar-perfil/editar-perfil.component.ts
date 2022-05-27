import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { getAuth, updateProfile , updatePassword } from "firebase/auth";
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {

  constructor(private authService: AuthenticationService,private storage: StorageService) { }
  
  nuevoUsuario={
    nombre:''
  }
  imagenSubida:any;
  subirImagen(event:any){
    try{
      let archivos=event.target.files
    
      this.authService.getULo();
      let usuario= this.authService.obtenerIdentificadorUsuario();

      let reader=new FileReader();
        reader.readAsDataURL(archivos[0]);
        reader.onloadend=()=>{
          //this.SubirImagen(usuario,reader.result);
        this.imagenSubida=reader.result;
        }
    }catch(err){console.log("error subir foto",err)}
    
  }

  cambiarImgUsuario(){
    let url;
    this.SubirImagen(this.nuevoUsuario,this.imagenSubida).then(x=>{
      console.log("subida"+{x});
      url=x;
      let id;
      id=this.authService.obtenerIdentificadorUsuario();
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          photoURL: url
        }).then(() => {
          console.log("Imagen listo");
          window.location.href="/perfil";
        }).catch((error) => {
        });
    });
  }
  urlImgFirebase:any;
  SubirImagen=(usuario:any,image:any)=>{
    let url;
    return new Promise((resolve)=>{
      this.storage.subirImagen(usuario+"_"+Date.now(),image).then(urlImagen=>{
        this.urlImgFirebase=urlImagen;
        console.log(this.urlImgFirebase);
        resolve(this.urlImgFirebase);
      });  
    })
    
  }



  cambiarNombre(){
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: this.nuevoUsuario.nombre, 
    }).then(() => {
      console.log("Nombre actualizado"+ this.nuevoUsuario.nombre);
      window.location.href="/perfil";
    }).catch((error) => {

    });
  }

  /* No creo editar la contraseña, ya están grandes para recordarla
  Ccontrasena(){
    if (this.nuevoUsuario.contrasena==this.nuevoUsuario.contrasena2){
      const auth = getAuth();

      const user = auth.currentUser;
      const newPassword = this.nuevoUsuario.contrasena
      
      updatePassword(user, newPassword).then(() => {
        console.log("Contraseña actualizado"+ newPassword);
        window.location.href="/perfil";
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }
    
  }*/

  ngOnInit() {
    this.nuevoUsuario.nombre=this.authService.obtenerNombreUsuario();
  }
}
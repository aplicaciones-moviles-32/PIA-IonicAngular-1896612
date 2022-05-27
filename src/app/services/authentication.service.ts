import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'; //Autenticación de FireBase
import firebase from 'firebase/compat/app'; //Importe 
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private aufauth: AngularFireAuth) { }

  //Formas de crear en la BD una nueva cuenta e identificar un logIn

  async registro(email:string,contrasena:string){
    try{
      return await this.aufauth.createUserWithEmailAndPassword(email.trim(),contrasena.trim());
    }catch(err){
      console.log("error crear usuario",err)
      return null;
    }
  }
  async login(email:string,contrasena:string){
    try{
      return await this.aufauth.signInWithEmailAndPassword(email,contrasena);
    }catch(err){
      console.log("error login",err)
      return null;
    }
  }

  //Forma para sacar el usuario actual
  getULo(){
    
    return this.aufauth.authState;
    
  }
  obtenerIdentificadorUsuario(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      return uid;
    }
    else{
      return null;
    }
  }
  obtenerNombreUsuario(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.displayName;
      return uid;
    }
    else{
      return null;
    }
  }
  obtenerImagen(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.photoURL;
      return uid;
    }
    else{
      return null;
    }
  }
  

  logOut(){
    this.aufauth.signOut();
  }
}

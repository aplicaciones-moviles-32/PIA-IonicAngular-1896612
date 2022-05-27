import { Component, OnInit } from '@angular/core';
//import { getMaxListeners } from 'process';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 //Objeto para obtener los datos del Usuario ingresado dentro del LogIn 
  usuario={
    email:'',
    contrasena:''
  }
  constructor(private authService: AuthenticationService, public alertController: AlertController) { }

  //Funcion para identificar el ingreso valido del usuario 
  Ingresar(){
    try{
      const{email,contrasena}=this.usuario; //Obtenemos la contraseña y el email del usuario 
      this.authService.login(email,contrasena).then(res=>{
        console.log("Sesion Iniciada:",res);
      })
    }
    catch(error){
      this.presentAlert();
      console.log("Aquí tronó") //En caso de error, una alerta saltará
    }
    
  
  }
  //Alerta al momento de inicar sesion de manera erronea
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ha pasado algo inesperado',
      subHeader: 'Revise bien los datos que puso ',
      message: ':p',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {}

}
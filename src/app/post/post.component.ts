import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbServiceService } from '../services/db-service.service';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { Camera } from '@capacitor/camera';
import { CameraResultType } from '@capacitor/camera';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Posteando Imagen',
      subHeader: 'Puede tardar un momento',
      message: ':)',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  picture:string;
  imagenSubida:any;
  constructor(private bd : DbServiceService,
    private authService: AuthenticationService,
    private storage: StorageService,
    private router:Router,
    public alertController: AlertController
    ) { 

    }

    usuario:any;
    urlImgFirebase:any;

    //En dispositivos web saltará error, ya que no identifica la cámara
    //se necesita otro capacitor para eso
    async TomarFoto(){
      try{
        const image=await Camera.getPhoto({
          quality:100,
          allowEditing:false,
          resultType:CameraResultType.DataUrl,
        });
        this.picture=image.dataUrl;
        let reader=new FileReader();
        let usuario= this.authService.obtenerIdentificadorUsuario();
        this.usuario=usuario;
        this.imagenSubida=image.dataUrl;
      }catch(err){console.log("error tomar foto",err)}
    }
    
   
    
      SubirImagen=(usuario:any,image:any)=>{
      let url;
      return new Promise((resolve)=>{
        this.storage.subirImagen(usuario+"_"+Date.now(),image).then(urlImagen=>{
        
          this.urlImgFirebase=urlImagen;
          this.nuevoPost.imgPublicacion=this.urlImgFirebase;
          console.log(this.urlImgFirebase);
          resolve(this.urlImgFirebase);
        });  
      })
      
    }
    cargarImagen(event:any){
      try{
        let archivos=event.target.files
      
        this.authService.getULo();
        let usuario= this.authService.obtenerIdentificadorUsuario();
  
        let reader=new FileReader();
          reader.readAsDataURL(archivos[0]);
          reader.onloadend=()=>{
          this.imagenSubida=reader.result;
          this.usuario=usuario;

          }
      }catch(err){console.log("error subir foto",err)}
      
      
    }
  ngOnInit(): void {
  }
  userLogged=this.authService.getULo();
  onSubmit(f: NgForm) {
    console.log("Submit")
  }

  //Atributos FB 
  nuevoPost : any = {
    caption: "", 
    id: "", 
    imgPublicacion: "", 
    nameUser: "",  
    imgUser: ""

  }

    actualizarNuevoPost() {
    this.nuevoPost.id=this.authService.obtenerIdentificadorUsuario();
    this.nuevoPost.userName=this.authService.obtenerNombreUsuario();
    this.nuevoPost.imgUser=this.authService.obtenerImagen();
    this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
      console.log("actualizar bd");
      this.bd.publicarPublicacion(this.nuevoPost).subscribe();
    });
    
    
  }

  subirPublicacionFeedAndFB(){
    this.presentAlert();
    console.log("actualizar bdx");
    this.nuevoPost.id=this.authService.obtenerIdentificadorUsuario();
    this.nuevoPost.userName=this.authService.obtenerNombreUsuario();
    this.nuevoPost.imgUser=this.authService.obtenerImagen();
    this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
      console.log("subida"+{x});
      this.bd.publicarPublicacion(this.nuevoPost).subscribe(res=>{
        window.location.href="/feed";
      });
    });
    
    
  }

}
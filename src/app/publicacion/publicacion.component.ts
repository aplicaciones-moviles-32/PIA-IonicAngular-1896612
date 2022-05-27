import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../services/db-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, 
    private bd: DbServiceService,
    public alertController: AlertController,
    private authService: AuthenticationService) {}


  userLogged=this.authService.getULo();
  publicacion :any;
  publicacionImprimir: any = {}
  
  posts: any = [];
  keys:any=[];
  tester : any = [];

  cargarFeedODePerfil() {
    this.bd.obtenerPublicacionesFeed()
    .subscribe(resp => {
      this.keys=Object.keys(resp).reverse();
     // console.log("llaves "+this.keys)
      this.tester = Object.values(resp);
      for(let test of this.tester){
        if(test != null){
          this.posts = this.posts.concat(test);
        }
      }
      this.posts.reverse();
      this.publicacion=this.keys[this.ruta.snapshot.params['idPost']];
      console.log("this.obtenerPublicacion("+this.publicacion+")");
      this.obtenerPublicacion(this.publicacion);
    })
   

   }
  ngOnInit(): void {
    this.cargarFeedODePerfil();
   }
   
   async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminando de la Base de Datos',
      subHeader: '¡Se esta eliminando la publicacion!',
      message: ':D',
      buttons: ['OK']
    });
  }

  obtenerPublicacion(id: string) : any {
    this.bd.obtenerDetalleDePublicacion(id).subscribe(res => {
      console.log(res);
      this.publicacionImprimir = res;
    })
  } 

   
  borrar()  {
    this.presentAlert();
    this.bd.eliminarPublicacion(this.publicacion).subscribe(res => {
      console.log(res);
      window.location.href="/feed";
    })
    
  }
  

 editar( nuevoCaption: any) {
  this.presentAlert();
  this.bd.actualizarPublicacion(this.publicacion, nuevoCaption).subscribe(res => {
    console.log("Se cambiaron los datos en FB ;)");
    
  });

}

}
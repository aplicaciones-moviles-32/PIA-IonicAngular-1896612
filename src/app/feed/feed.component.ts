import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DbServiceService } from '../services/db-service.service';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  colorHappy="light";
  colorSend="light";
  colorComent="light";
  colorSave="light";

  //Funcionalidades de los botones al hacer click en ellos
  happy(){
    if(this.colorHappy=="light")
    this.colorHappy="warning";
    else
    this.colorHappy="light";
  }
  send(){
    if(this.colorSend=="light")
    this.colorSend="tertiary";
    else
    this.colorSend="light";
    
  }
  coment(){
    if(this.colorComent=="light")
    this.colorComent="danger";
    else
    this.colorComent="light";
   
  }
  save(){
    if(this.colorSave=="light")
    this.colorSave="primary";
    else
    this.colorSave="light";
   
    
  }
  ///////////////////////////////////////////////////////


  constructor( private db: DbServiceService, 
    private popover: PopoverController,
    private authService: AuthenticationService,
    private router: Router) { 
      //Con esto se arma
    }

    ngOnInit(): void {
      this.cargarFeed();
     }
     
     userLogged=this.authService.getULo();
   
     key=123;
     posts: any = [];
     reves:any=[];
  tester : any = [];
  
  filtro : string = '';

  isPopoverOpen: boolean = false;
   
     cargarFeed() {
      this.db.obtenerPublicacionesFeed()
      .subscribe(resp => {
        this.tester = Object.values(resp);
        console.log(this.tester); //Verifica en consola que los objetos se puedan traer de la base de datos
        for(let test of this.tester){
          if(test != null){
            this.posts = this.posts.concat(test);
          }
        }
        this.reves=this.posts.reverse();
      })
     
     }
     
     editando: boolean = false;
   
     editar() {
       this.editando = !this.editando;
     }
   
     //Es más fácil poner los log que entrar a corrborrar en la base de datos
     guardar(idPost: number, nuevoCaption: any) {
       this.db.actualizarPublicacion(idPost, nuevoCaption).subscribe(res => {
         console.log("Se actualizo la base de datos")
       });
   
       this.editar();
     }

      /*Funcion sin utilizar
     borrar(idPost : number)  {
       this.db.eliminarPublicacion(idPost).subscribe(res => {
         console.log(res);
         this.cargarFeed();
       })
       
     }*/
   

}
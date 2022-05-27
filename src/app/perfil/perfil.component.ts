//Esto ya se terminó
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  //Se utilizó el comando de geolocalización de ionic, solo son números, ya que la API es de paga 
  constructor(private http: HttpClient,private authService: AuthenticationService) { }
 
  latitud:number;
  longitud:number;
  userLogged=this.authService.getULo();

  ngOnInit(): void {
    this.ObtenerCoordenadas();
  }

  //Sintaxis para obtener coordenadas actuales de la geolozalicacion del usuario
  async ObtenerCoordenadas(){
    const ObtenerCoordenada=await Geolocation.getCurrentPosition();
    this.latitud=ObtenerCoordenada.coords.latitude;
    this.longitud=ObtenerCoordenada.coords.longitude;
  }
  usuario : any = {}

  editando = false;

  toggleEditar(): void {
    this.editando = !this.editando;
  }
}
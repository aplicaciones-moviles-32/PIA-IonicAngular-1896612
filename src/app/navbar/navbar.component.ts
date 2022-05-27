import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  userLogged=this.authService.getULo(); //Autenticar que efectivamente, el usuario existas, en caso contrario, vuelve al logIn
  cerrarSesion(){
    this.authService.logOut(); //Cierra sesion y vuelve al LogIn
  }
  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss'],
})
export class HistoriasComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  
  
  userLogged=this.authService.getULo();
  ngOnInit() {}

}
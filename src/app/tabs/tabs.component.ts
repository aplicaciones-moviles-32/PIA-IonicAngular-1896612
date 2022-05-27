//Esta parte ya quedo, solo es la funcionalidad básica de los tabs
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  userLogged=this.authService.getULo();
  ngOnInit() {}

}
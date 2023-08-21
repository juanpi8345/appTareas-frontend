import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private loginService:LoginService, private router:Router) {}

  logout(){
    this.loginService.logOut();
    this.router.navigate(['autenticarse']);
  }

}

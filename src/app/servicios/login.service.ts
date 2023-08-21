import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private url : string = "http://localhost:8080/auth/";

  public loginStatusSubject = new Subject<any>();

  public generarToken(usuario:Usuario){
    return this.http.post(this.url + "login",usuario);
  }

  public loginUser(token:string){
    localStorage.setItem("token",token);
  }

  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  public isLoggedIn():boolean{
    let tokenStr = localStorage.getItem("token");
    if(tokenStr != undefined && tokenStr != null && tokenStr != '')
      return true;
    return false;
  }

  public setUser(usuario:Usuario){
    localStorage.setItem("usuario",JSON.stringify(usuario));
  }

  public getUser(){
    let userStr = localStorage.getItem("usuario");
    if(userStr != null){
      return JSON.parse(userStr);
    }
  }

  public getToken(){
    return localStorage.getItem("token");
    
  }

  public getUserRol(){
    let usuario = this.getUser();
    return usuario.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(this.url + "actual-usuario");
  }

  
}

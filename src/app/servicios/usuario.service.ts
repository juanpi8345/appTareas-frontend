import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  private url : string = "http://localhost:8080/usuario/";

  public registrarUsuario(usuario:Usuario){
    return this.http.post(this.url,usuario);
  }
}

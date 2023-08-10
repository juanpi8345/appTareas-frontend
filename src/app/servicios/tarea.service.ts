import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from '../modelos/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http:HttpClient) { }

  private url : string = "http://localhost:8080/api/tareas/";

  public agregarTarea(usuarioId:number, tarea:Tarea){
    return this.http.post(this.url + "usuario/"+usuarioId,tarea);
  }

  public obtenerTareasPendientes(page:number,usuarioId:number){
    return this.http.get(this.url+ "usuario/" +usuarioId + "?page="+page);
  }

}

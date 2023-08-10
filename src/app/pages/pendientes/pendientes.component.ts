import { Component } from '@angular/core';
import { Tarea } from 'src/app/modelos/tarea';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent {

  constructor(private tareaService:TareaService){}
  tareas:any;

  numeros : number[] = [1,2,3,4,5,6,7,8,9,10];

  ngOnInit():void{
    //Aca va el usuario autenticado
    this.tareaService.obtenerTareasPendientes(0,2).subscribe((tarea:any)=>{
      console.log(tarea.content);
      this.tareas = tarea.content;
    });
  }

  obtenerTareasPendientes(page:number){
    this.tareaService.obtenerTareasPendientes(page-1,2).subscribe((tarea:any)=>{
      this.tareas = tarea.content;
    })
  }
}

import { Component } from '@angular/core';
import { TareaService } from 'src/app/servicios/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completadas',
  templateUrl: './completadas.component.html',
  styleUrls: ['./completadas.component.css']
})
export class CompletadasComponent {

  constructor(private tareaService:TareaService){}

  tareas:any;

  numeros : number[] = [1,2,3,4,5,6,7,8,9,10];

  ngOnInit():void{
    this.tareaService.obtenerTareasCompletadas(0,2).subscribe((tareas:any)=>{
      this.tareas = tareas.content;
      this.validarTareas();
    })
  }

  validarTareas(){
    if(this.tareas.length == 0){
      Swal.fire("No hay tareas","No hay tareas para mostrar en esta seccion","info");
    }
  }

  obtenerTareasCompletadas(page:number){
    this.tareaService.obtenerTareasCompletadas(page-1,2).subscribe((tarea:any)=>{
      this.tareas = tarea.content;
      this.validarTareas();
    })
    
  }

}

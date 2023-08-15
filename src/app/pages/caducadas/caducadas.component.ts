import { Component } from '@angular/core';
import { Tarea } from 'src/app/modelos/tarea';
import { TareaService } from 'src/app/servicios/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caducadas',
  templateUrl: './caducadas.component.html',
  styleUrls: ['./caducadas.component.css']
})
export class CaducadasComponent {

  constructor(private tareaService:TareaService){}

  tareas:any;

  numeros : number[] = [1,2,3,4,5,6,7,8,9,10];
  numeroActual : number = 1;

  ngOnInit():void{
    this.tareaService.obtenerTareasCaducadas(0,2).subscribe((tareas:any)=>{
      this.tareas = tareas.content;
      this.validarTareas();
    })
  }

  validarTareas(){
    if(this.tareas.length == 0){
      Swal.fire("No hay tareas","No hay tareas para mostrar en esta seccion","info");
    }
  }

  obtenerTareasCaducadas(page:number){
    this.tareaService.obtenerTareasCaducadas(page-1,2).subscribe((tarea:any)=>{
      this.tareas = tarea.content;
      this.numeroActual = page;
      this.validarTareas();
    })
  }

  obtenerTareasCaducadasSegunOpcion(orderBy:string){
    this.tareaService.obtenerTareasCaducadasSegunOpcion(2,orderBy).subscribe((tareas:any)=>{
     this.tareas = tareas.content;
     this.validarTareas();
    })
   }

  eliminarTarea(tarea:Tarea){
    Swal.fire({
      title:"Eliminar tarea",
      text:"¿Eliminar tarea?",
      showCancelButton:true,
      icon:'warning',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.tareaService.eliminarTarea(tarea.tareaId).subscribe();
        location.reload();
      }
    })
  }

  vaciar(){
    Swal.fire({
      title:"Vaciar tareas completadas",
      text:"¿Vaciar tareas completadas?",
      showCancelButton:true,
      icon:'warning',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.tareaService.eliminarTareasCaducadas(2).subscribe();
        location.reload();
      }
    })
  }

}

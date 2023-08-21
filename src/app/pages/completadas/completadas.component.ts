import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/modelos/tarea';
import { Usuario } from 'src/app/modelos/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completadas',
  templateUrl: './completadas.component.html',
  styleUrls: ['./completadas.component.css']
})
export class CompletadasComponent {

  constructor(private tareaService:TareaService, private loginService:LoginService, private router:Router){}

  tareas:any;
  currentUser:Usuario;
  numeros : number[] = [1,2,3,4,5,6,7,8,9,10];
  numeroActual:number = 1;

  ngOnInit():void{
    this.loginService.getCurrentUser().subscribe((usuario:Usuario)=>{
      this.currentUser = usuario;
      this.tareaService.obtenerTareasCompletadas(0,this.currentUser.usuarioId).subscribe((tareas:any)=>{
        this.tareas = tareas.content;
        this.validarTareas();
      })
    },err=>{
      this.loginService.logOut();
      this.router.navigate(['autenticarse']);
    })
  }

  validarTareas(){
    if(this.tareas.length == 0){
      Swal.fire("No hay tareas","No hay tareas para mostrar en esta seccion","info");
    }
  }

  obtenerTareasCompletadas(page:number){
    this.tareaService.obtenerTareasCompletadas(page-1,this.currentUser.usuarioId).subscribe((tarea:any)=>{
      this.tareas = tarea.content;
      this.numeroActual = page;
      this.validarTareas();
    })
  }

  obtenerTareasCompletadasSegunOpcion(orderBy:string){
    this.tareaService.obtenerTareasCompletadasSegunOpcion(this.currentUser.usuarioId,orderBy).subscribe((tareas:any)=>{
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
        this.tareaService.eliminarTareasCompletadas(this.currentUser.usuarioId).subscribe();
        location.reload();
      }
    })
  }

}

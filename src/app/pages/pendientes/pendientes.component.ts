import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/modelos/tarea';
import { Usuario } from 'src/app/modelos/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent {

  constructor(private tareaService:TareaService, private router:Router, private loginService:LoginService){}
  tareas:any;

  currentUser:Usuario; 

  numeros : number[] = [1,2,3,4,5,6,7,8,9,10];
  numeroActual : number = 1;

  ngOnInit():void{

    this.loginService.getCurrentUser().subscribe((usuario:Usuario)=>{
      this.currentUser = usuario;
      this.tareaService.obtenerTareasPendientes(0,this.currentUser.usuarioId).subscribe((tarea:any)=>{
        this.tareas = tarea.content;
        this.validarTareas();
      })
    },err=>{
      this.loginService.logOut();
      this.router.navigate(['autenticarse']);
    });
  }

  obtenerTareasPendientes(page:number){
    this.tareaService.obtenerTareasPendientes(page-1,this.currentUser.usuarioId).subscribe((tarea:any)=>{
      this.tareas = tarea.content;
      this.numeroActual = page;
      this.validarTareas();
    })
  }

  obtenerTareasPendientesSegunOpcion(orderBy:string){
   this.tareaService.obtenerTareasPendientesSegunOpcion(this.currentUser.usuarioId,orderBy).subscribe((tareas:any)=>{
    this.tareas = tareas.content;
    this.validarTareas();
   })
  }

  validarTareas(){
    if(this.tareas.length == 0){
      Swal.fire("No hay tareas","No hay tareas para mostrar en esta seccion","info");
    }
  }

  marcarCompletada(tarea:Tarea){
    Swal.fire({
      title:"Marcar como completada",
      text:"¿Marcar tarea coomo completada?",
      showCancelButton:true,
      icon:'question',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.tareaService.marcarTareaCompletada(tarea).subscribe(()=>{
          this.router.navigate(['home/completadas']);
        })
      }
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

  completarTodas(){
    Swal.fire({
      title:"Completar tareas",
      text:"¿Estas seguro de que queres marcar todas las tareas pendientes como completadas?",
      showCancelButton:true,
      icon:'warning',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.tareaService.marcarTodasCompletadas(this.currentUser.usuarioId).subscribe();
        location.reload();
      }
    })
  }
}

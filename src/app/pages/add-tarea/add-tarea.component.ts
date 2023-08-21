import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/modelos/tarea';
import { Usuario } from 'src/app/modelos/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent {

  constructor(private snack:MatSnackBar, private loginService:LoginService,
    private tareaService:TareaService, private router:Router){}

  currentUser:Usuario;

  tarea:Tarea = new Tarea();
  fechaFormateada : Date = new Date();

  ngOnInit():void{
    this.loginService.getCurrentUser().subscribe((usuario:Usuario)=>{
      if(usuario.username != null){
        this.currentUser = usuario;
        return;
      }
      this.router.navigate(['autenticarse']);

    })
  }

  agregarTarea(){
    if(this.tarea.titulo != null && this.tarea.descripcion != null && this.tarea.fechaCaducidad != null){
      this.tareaService.agregarTarea(this.currentUser.usuarioId,this.tarea).subscribe(()=>{
        Swal.fire("Tarea agreada","La tarea se agrego correctamente","success");
        this.router.navigate(['home/pendientes']);
      })
      return;
    }
    this.snack.open("Hay campos sin completar","Aceptar",{
      duration:3000
    })
    return;
  }
}

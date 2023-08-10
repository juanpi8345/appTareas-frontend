import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private tareaService:TareaService){}

  tarea:Tarea = new Tarea();
  fechaFormateada : Date = new Date();

  agregarTarea(){
    if(this.tarea.titulo != null && this.tarea.descripcion != null && this.tarea.fechaCaducidad != null){
      // this.loginService.getCurrentUser().subscribe((currentUser:Usuario)=>{
      //   this.tareaService.agregarTarea(currentUser.usuarioId,this.tarea).subscribe(()=>{
      //     Swal.fire("Tarea agregada","La tarea se agrego correctamente","success")
      //   });
      // },err=>{
      //   console.log(err);
      // })

      this.tareaService.agregarTarea(2,this.tarea).subscribe(()=>{
        Swal.fire("Tarea agregada","La tarea se agrego correctamente","success")
      });
      return;
    }
    this.snack.open("Hay campos sin completar","Aceptar",{
      duration:3000
    })
    return;
  }
}

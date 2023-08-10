import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  
  constructor(private usuarioService:UsuarioService, private snack:MatSnackBar, private loginService:LoginService
    , private router:Router) {}

  login = true;
  usuario : Usuario = new Usuario();

  ngOnInit(){ }

  registrarse(){
    if(this.usuario.nombre == '' || this.usuario.apellido == '' || this.usuario.username == '' || this.usuario.password == ''){
      this.snack.open("Completa todos los campos","Aceptar",{
        duration:3000
      })
      return;
    }
  if(this.usuario.password.length < 4){
    this.snack.open("La clave debe tener 4 o mas caracteres","Aceptar",{
      duration:3000
    })
    return;
  }
   this.usuarioService.registrarUsuario(this.usuario).subscribe(()=>{
      Swal.fire("Usuario registrado","El usuario se registro correctamente","success");
      this.login = !this.login;
      this.usuario.username = ''; this.usuario.password = '';
    });
  }

  limpiarCampos(){
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.username = '';
    this.usuario.password = '';
  }

  iniciarSesion(){
    // this.loginService.generarToken(this.usuario).subscribe((token:any)=>{
    //   this.loginService.loginUser(token.token);
    //   this.loginService.getCurrentUser().subscribe((user:Usuario)=>{
    //     this.loginService.setUser(user);
    //     this.loginService.loginStatusSubject.next(true);
    //     
    //   })
   // })
   this.router.navigate(['/home']);
  }


}

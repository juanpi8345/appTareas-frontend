import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'*',redirectTo:'autenticarse'},
  {path:'autenticarse',component:IniciarSesionComponent},
  {path:'home',component:HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

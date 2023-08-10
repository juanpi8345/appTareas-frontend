import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './pages/home/home.component';
import { AddTareaComponent } from './pages/add-tarea/add-tarea.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';

const routes: Routes = [
  {path:'*',redirectTo:'autenticarse'},
  {path:'autenticarse',component:IniciarSesionComponent},
  {path:'home',component:HomeComponent,children:[
    {path:'add',component:AddTareaComponent},
    {path:'pendientes',component:PendientesComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

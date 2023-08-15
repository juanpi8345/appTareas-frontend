import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './pages/home/home.component';
import { AddTareaComponent } from './pages/add-tarea/add-tarea.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { CompletadasComponent } from './pages/completadas/completadas.component';
import { CaducadasComponent } from './pages/caducadas/caducadas.component';

const routes: Routes = [
  {path:'*',redirectTo:'autenticarse'},
  {path:'autenticarse',component:IniciarSesionComponent},
  {path:'home',component:HomeComponent,children:[
    {path:'add',component:AddTareaComponent},
    {path:'pendientes',component:PendientesComponent},
    {path:'completadas',component:CompletadasComponent},
    {path:'caducadas',component:CaducadasComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

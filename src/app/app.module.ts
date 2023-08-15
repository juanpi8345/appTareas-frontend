import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { authInterceptorProviders } from './servicios/interceptor.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { AddTareaComponent } from './pages/add-tarea/add-tarea.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { CompletadasComponent } from './pages/completadas/completadas.component';
import { CaducadasComponent } from './pages/caducadas/caducadas.component';


@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    HomeComponent,
    AddTareaComponent,
    PendientesComponent,
    CompletadasComponent,
    CaducadasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

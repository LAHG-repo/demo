import { LoginModule } from './../login/login.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { InformacionPrincipalComponent } from './components/informacion-principal/informacion-principal.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MainComponent,
    InformacionPrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoginModule
  ],
  exports:[
    MainComponent,
    InformacionPrincipalComponent
  ]
})
export class MainModule { }

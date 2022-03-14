import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';
import { SharedModule } from '../shared/shared.module';
import { NotificacionMainComponent } from './components/notificacion-main/notificacion-main.component';



@NgModule({
  declarations: [
    RegistroComponent,
    NotificacionMainComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    RegistroComponent,
    NotificacionMainComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NotificacionModule { }

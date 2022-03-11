import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionRoutingModule } from './notificacion-routing.module';
import { NotificacionMainComponent } from './components/notificacion-main/notificacion-main.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NotificacionMainComponent
  ],
  imports: [
    NotificacionRoutingModule,
    CommonModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NotificacionModule { }

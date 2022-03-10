import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosNotificacion } from './datos-notificacion';
import { NotificacionComponent } from './notificacion.component';
import { TIPO_NOTIFICACION } from './tipos-notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarNotificacionExito(mensaje: string) {
    this.mostrar(mensaje, TIPO_NOTIFICACION.EXITO)
  }

  mostrarNotificacionError(mensaje: string) {
    this.mostrar(mensaje, TIPO_NOTIFICACION.ERROR)
  }

  mostrarNotificacionInfo(mensaje: string) {
    this.mostrar(mensaje, TIPO_NOTIFICACION.INFO)
  }

  ocultar() {
    this._snackBar.dismiss();
  }

  private mostrar(mensaje: string, tipo: TIPO_NOTIFICACION, duracion?: number, horizontal?: any, vertical?: any) {
    const datos: DatosNotificacion = {
      mensaje,
      tipo
    }
    this._snackBar.openFromComponent(NotificacionComponent, {
      data: datos,
      duration: duracion || 4000,
      horizontalPosition: horizontal || 'center',
      verticalPosition: vertical || 'top',
      panelClass: ['snack']
    });
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatosNotificacion } from './datos-notificacion';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: DatosNotificacion,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cerrar(): void {
    this._snackBar.dismiss();
  }

}

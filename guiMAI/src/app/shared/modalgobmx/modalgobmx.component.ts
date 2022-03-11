import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-modalgobmx',
  templateUrl: './modalgobmx.component.html',
  styleUrls: ['./modalgobmx.component.scss']
})
export class ModalgobmxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalgobmxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {}

  funcionAceptar(): void {
    if (this.data.fnAceptar) {
      this.data.fnAceptar();
    }

    this.dialogRef.close();
  }

  funcionCancelar(): void {
    if (this.data.fnCancelar) {
      this.data.fnCancelar();
    }

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSiClick(): void {
    this.dialogRef.close();
  }
}


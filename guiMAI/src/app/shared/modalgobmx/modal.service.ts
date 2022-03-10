import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalgobmxComponent } from './modalgobmx.component';
import { ModalAvisoGobmxComponent } from './modal-aviso-gobmx/modal-aviso-gobmx.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  private abrir(titulo: string,
    mensaje: string,
    textoBotonCancelar: string | null,
    textoBotonAceptar: string | null,
    fnSi: (data: any) => any | null,
    fnNo: (data: any) => any | null) {
    this.dialog.open(ModalgobmxComponent, {
      disableClose: true,
      width: '1000',
      data: {
        titulo,
        mensaje,
        textoBotonCancelar,
        textoBotonAceptar,
        fnCancelar: fnNo,
        fnAceptar: fnSi
      }
    })
  }

  private abrirSoloAviso(titulo: string,
    mensaje: string,
    textoBotonAceptar: string | null,
    fnSi: (data: any) => any | null
    ) {
    this.dialog.open(ModalAvisoGobmxComponent, {
      disableClose: true,
      width: '1000',
      data: {
        titulo,
        mensaje,
        textoBotonAceptar,
        fnAceptar: fnSi
      }
    })
  }

  mostrarConfirmacionGenerica(): void {
    this.abrir('Atención', '¿Esta seguro que desea continuar?', 'No', 'Si', () => null, () => null);
  }

  mostrarConfirmacion(titulo: string, mensaje: string, textoBotonCancelar?: string | null, textoBotonAceptar?: string | null, fnOk?:any | null, fnCancel?:any | null):void{
    this.abrir(titulo, mensaje,textoBotonCancelar || 'No', textoBotonAceptar || 'Si',fnOk,fnCancel);
  }

  mostrarAvisoExito(mensaje: string, textoBotonAceptar?: string, fnOk?: any | null):void{
    this.abrir('', mensaje,'Cancelar', textoBotonAceptar || 'Aceptar',fnOk, () => null);
  }

  mostrarSoloAviso(titulo:string, mensaje: string, textoBotonAceptar?: string, fnOk?: any | null):void{
    this.abrirSoloAviso(titulo, mensaje, textoBotonAceptar || 'Aceptar',fnOk);
  }

  mostrarAvisoError(mensaje: string, textoBotonAceptar?: string):void{
    this.abrir('', mensaje,'Cancelar', textoBotonAceptar || 'Aceptar',() => null, () => null);
  }

  mostrarModal(componente: any, datos?: any){
    const dialogRef = this.dialog.open(componente, {
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  cerrar(){
    this.dialog.closeAll();
  }
}

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { TipoInput } from './tipo-input.enum';

@Component({
  selector: 'app-campo-texto-gobmx',
  templateUrl: './campo-texto-gobmx.component.html',
  styleUrls: ['./campo-texto-gobmx.component.css']
})
export class CampoTextoGobmxComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  etiqueta: string;
  @Input()
  mostrarError: boolean | null | undefined;
  @Input()
  mensajeError: string | null;
  @Input()
  placeholder: string;
  @Input()
  longitud: number;
  @Input()
  esObligatorio: boolean;
  @Input()
  tipo: TipoInput
  @Input()
  soloMayusculas: boolean;
  @Input()
  formGroup: FormGroup;

  esPassword: boolean;
  fieldTextType: boolean;

  constructor() {
    this.esObligatorio = false;
    this.tipo = TipoInput.ALFANUMERICO
    this.soloMayusculas = true;
    this.esPassword = false;
  }

  ngOnInit(): void {
    //console.log(this.formGroup)
  }

  mascara(event: any){
    switch (this.tipo) {
      case TipoInput.PASSWORD:
        this.esPassword = true;
        this.soloMayusculas = false;
      break;
      case TipoInput.ALFANUMERICO:
        this.textoAlfanumerico(event);
        break;
      case TipoInput.NUMERICO:
        this.soloNumeros(event);
        break;
      case TipoInput.CORREO:
        this.correo(event);
        break;
      default:
        this.soloTexto(event)
        break;
    }
  }

  togglePassword(event: any){
    this.fieldTextType = !this.fieldTextType;
  }

  private soloTexto(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zñA-ZÑ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  private textoAlfanumerico(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zñA-ZÑ0-9 ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  private soloNumeros(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  private correo(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zñA-ZÑ0-9@_.\- ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}

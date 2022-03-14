import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { TipoInput } from 'src/app/shared/campo-texto-gobmx/tipo-input.enum';
import { ModalService } from 'src/app/shared/modalgobmx/modal.service';
import { NotificacionService } from 'src/app/shared/notificacion/notificacion.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Utils } from 'src/app/shared/utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperacion-password',
  templateUrl: './recuperacion-password.component.html',
  styleUrls: ['./recuperacion-password.component.scss']
})
export class RecuperacionPasswordComponent implements OnInit, OnDestroy {
  recoveryform: any;
  isSubmited: boolean = false;
  tipoCampo = TipoInput;
  segundos: number;
  isTimerFinalizado: boolean = false;
  email: string;

  @Output()
  reiniciarForm: EventEmitter<boolean>;
  intervalo: any;

  private readonly totalSegundos = 59;

  constructor(
    private router: Router,
    private notificacionService: NotificacionService,
    private modalService: ModalService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private session: SessionStorageService
  ) {
    this.generarFormulario();
    this.reiniciarForm = new EventEmitter(false);
    this.segundos = this.totalSegundos;
    this.email = '*****bel@imss.gob.mx';
  }
  ngOnDestroy(): void {
    if(this.intervalo){
      clearInterval(this.intervalo);
    }
  }

  ngOnInit(): void {
  }

  goLogin(){
    this.reiniciarForm.emit(true);
  }

  doEnvio(){
    this.isSubmited = true;
    this.intervalo = window.setInterval(()=>{
      if(this.segundos == 0){
        clearInterval(this.intervalo);
        this.isTimerFinalizado = true;
        this.isSubmited = false;
        this.segundos = this.totalSegundos;
      }else{
        this.segundos--;
      }
    },1000);
  }

  doReenvio(){

  }

  public validarCampo(campo: AbstractControl){
    return Utils.esCampoNoValido(campo, this.isSubmited)
  }

  private generarFormulario() {
    this.recoveryform = this.formbuilder.group({
      usuario: ['', Validators.compose([Validators.required])]
    });
  }
}

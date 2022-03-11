import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modalgobmx/modal.service';
import { NotificacionService } from 'src/app/shared/notificacion/notificacion.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {

  actualizacionform: FormGroup;
  isSubmited: boolean = false;

  constructor(
    private notificacionService: NotificacionService,
    private modalService: ModalService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.generarFormulario();
    TokenStorageService.estaLogeado.next(false);
  }

  public doActualizacion(){
    this.isSubmited = true;
    console.log(this.actualizacionform)
    if(this.actualizacionform.valid){
      this.authService.actualizarContrasenia(this.actualizacionform.controls.confirmacion.value)
      .subscribe(response=>{
        TokenStorageService.estaLogeado.next(true);
        console.log('se actualiza la contraseña', response);
        this.notificacionService.mostrarNotificacionExito('Contraseña modificada con éxito');
        this.route.navigateByUrl('/consulta');
      },err=>{
        this.notificacionService.mostrarNotificacionError('No fue posible actualizar la contraseña, intente más tarde');
        console.log(err)
      })

    }else{
      this.notificacionService.mostrarNotificacionError('Debe capturar todos los campos obligatorios');
    }

  }

  private generarFormulario() {
    this.actualizacionform = this.formbuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmacion: ['', Validators.required]
    }, {
      validators: this.checkPasswords
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmacion')?.value
    return pass === confirmPass ? null : { sonDistintos: true }
  }
}

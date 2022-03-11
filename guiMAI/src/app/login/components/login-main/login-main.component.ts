import { ModalService } from 'src/app/shared/modalgobmx/modal.service';
import { TipoInput } from './../../../shared/campo-texto-gobmx/tipo-input.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionService } from '../../../shared/notificacion/notificacion.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { Utils } from 'src/app/shared/utils';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss']
})
export class LoginMainComponent implements OnInit, OnDestroy {

  token: string | undefined;

  tipoCampo = TipoInput;
  isSubmited: boolean = false;
  esPrimeraVez: boolean = false;

  loginform: FormGroup;
  authSubscription: Subscription;
  roles: any;

  private readonly mainUrl = '/simulador';

  constructor(private router: Router,
    private notificacionService: NotificacionService,
    private modalService: ModalService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private session: SessionStorageService
  ) {
    this.generarFormulario();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.tokenStorageService.limpiarSesion();
      this.session.clear();
    }
  }

  doLogin(): void {
    this.isSubmited = true;
    console.log('CURP',this.loginform);

    if (this.loginform.invalid) {
      this.notificacionService.mostrarNotificacionError('Debe completar los datos obligatorios');
    }else{
      const curp = this.loginform.controls.curp.value;
      const paswd = this.loginform.controls.noempleado.value;
      this.authSubscription = this.authService.login(curp,paswd)
      .subscribe(response=>{
        console.log(response);
        this.tokenStorageService.saveToken(response.access_token);
        this.tokenStorageService.saveRefreshToken(response.refresh_token);
        this.tokenStorageService.saveUser(response.nombre);
        this.tokenStorageService.saveTokenExpiracion(response.expires_in);
        this.router.navigateByUrl(this.mainUrl);
      }, err =>{
        this.notificacionService.mostrarNotificacionError('Usuario no válido, por favor verifique');
        console.log(err)
      })
    }


  }

  doRefrescarToken(){
    const token = this.tokenStorageService.getRefreshToken();
    if(token){
      this.authService.refrescarToken(token)
      .subscribe(response=>{
        console.log(response)
        this.tokenStorageService.saveToken(response.access_token);
        this.tokenStorageService.saveRefreshToken(response.refresh_token);
        this.tokenStorageService.saveUser(response.nombre);
        this.tokenStorageService.saveTokenExpiracion(response.expires_in);
      }, err =>{
        this.notificacionService.mostrarNotificacionError('Usuario no válido, por favor verifique');
        console.log(err)

      });
    }

  }


  doRecuperacion(){
    this.modalService.mostrarSoloAviso('','Se ha mandado un mensaje al correo de la cuenta con la nueva contraseña.','Continuar');
  }


  public limpiarForma() {
    this.loginform.reset();
    this.isSubmited = false;
  }

  private generarFormulario() {
    this.loginform = this.formbuilder.group({
      curp: ['', Validators.compose([Validators.required, Validators.minLength(18)])],
      noempleado: ['', Validators.compose([Validators.required])],
      captcha: [null,Validators.required]
    },
    {
      validators: this.verificarFormatoCurp
    }
    );
  }

  verificarFormatoCurp: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const curp = group.get('curp')?.value;
    const validacion = Utils.verificarFormatoCurp(curp);
    return validacion ? null : { noValido: true }
  }
}

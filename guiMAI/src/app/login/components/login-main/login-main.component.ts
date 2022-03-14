import { ModalService } from 'src/app/shared/modalgobmx/modal.service';
import { TipoInput } from './../../../shared/campo-texto-gobmx/tipo-input.enum';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
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
  mostrarRecuperacion: boolean = false;

  loginform: FormGroup;
  authSubscription: Subscription;
  roles: any;

  @Input()
  actualizarPassword: boolean;

  private readonly mainUrl = '/home';

  constructor(private router: Router,
    private notificacionService: NotificacionService,
    private modalService: ModalService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private session: SessionStorageService
  ) {
    this.generarFormulario();
    this.actualizarPassword = false;
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.tokenStorageService.limpiarSesion();
      this.session.clear();
    }

    if(this.actualizarPassword === undefined){
      this.actualizarPassword = false;
    }
    console.log(this.mostrarRecuperacion,this.actualizarPassword);
  }

  onReiniciarResponse(response: boolean){
    if(response){
      this.actualizarPassword = false;
      this.mostrarRecuperacion = false;
    }
  }

  doLogin(): void {
    this.isSubmited = true;

    if (this.loginform.invalid) {
      this.notificacionService.mostrarNotificacionError('Debe completar los datos obligatorios');
    }else{
      this.router.navigateByUrl(this.mainUrl);
      /*const usuario = this.loginform.controls.usuario.value;
      const paswd = this.loginform.controls.password.value;
      this.authSubscription = this.authService.login(usuario,paswd)
      .subscribe(response=>{
        console.log(response);
        this.tokenStorageService.saveToken(response.access_token);
        this.tokenStorageService.saveRefreshToken(response.refresh_token);
        this.tokenStorageService.saveUser(response.nombre);
        this.tokenStorageService.saveTokenExpiracion(response.expires_in);
        this.router.navigateByUrl(this.mainUrl);

      }, err =>{
        this.notificacionService.mostrarNotificacionError('Usuario y/o contraseña incorrectos, Favor de capturar de nuevo');
        console.log(err)
      })*/
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
    this.mostrarRecuperacion = true;
    this.actualizarPassword = false;
  }


  public limpiarForma() {
    this.loginform.reset();
    this.isSubmited = false;
  }

  public validarCampo(campo: AbstractControl){
    return Utils.esCampoNoValido(campo, this.isSubmited)
  }

  private generarFormulario() {
    this.loginform = this.formbuilder.group({
      usuario: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    },
    {
      //validators: this.verificarFormatoCorreo
    }
    );
  }

  verificarFormatoCorreo: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const usuario = group.get('usuario')?.value;
    const validacion = Utils.verificarFormatoEmail(usuario);
    return validacion ? null : { noValido: true }
  }
}

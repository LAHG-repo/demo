import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMainComponent } from './components/login-main/login-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CambioPasswordComponent } from './components/cambio-password/cambio-password.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { RecuperacionPasswordComponent } from './components/recuperacion-password/recuperacion-password.component';



@NgModule({
  declarations: [
    LoginMainComponent,
    CambioPasswordComponent,
    RecuperacionPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports:[
    LoginMainComponent,
    CambioPasswordComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
    }
  ]
})
export class LoginModule { }

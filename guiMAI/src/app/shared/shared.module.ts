import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalgobmxComponent } from './modalgobmx/modalgobmx.component';
import { HeaderComponent } from './header/header.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FechaComponent } from './fecha/fecha.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SpanCampoObligatorioComponent } from './span-campo-obligatorio/span-campo-obligatorio.component';
import { SpanErrorComponent } from './span-error/span-error.component';
import { CampoTextoGobmxComponent } from './campo-texto-gobmx/campo-texto-gobmx.component';
import { ControlErrorsDirective } from './directivas/control-error.directive';
import { MayusculasDirective } from './directivas/mayusculas.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAvisoGobmxComponent } from './modalgobmx/modal-aviso-gobmx/modal-aviso-gobmx.component';
import { UsuarioNavbarComponent } from './usuario-navbar/usuario-navbar.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RepeatTypeComponent } from './formly-types/repeat-component';
import { FormlyFieldButton } from './formly-types/field-button.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'


const maskConfig: Partial<IConfig> = {
  validation: false,
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [
    ModalgobmxComponent,
    HeaderComponent,
    NotificacionComponent,
    FechaComponent,
    NavbarComponent,
    SpanCampoObligatorioComponent,
    SpanErrorComponent,
    CampoTextoGobmxComponent,
    MayusculasDirective,
    ControlErrorsDirective,
    ModalAvisoGobmxComponent,
    UsuarioNavbarComponent,
    RepeatTypeComponent,
    FormlyFieldButton
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgPipesModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
    // MATERIAL
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
        {
          name: 'button',
          component: FormlyFieldButton,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      ],
      wrappers: [],
      validators: [],
      validationMessages: [
        { name: 'required', message: `Este campo es obligatorio` },
      ],
    }),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports:[
    ModalgobmxComponent,
    HeaderComponent,
    NotificacionComponent,
    FechaComponent,
    NavbarComponent,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    SpanCampoObligatorioComponent,
    NgPipesModule,
    NgxMaskModule,
    SpanErrorComponent,
    NgxWebstorageModule,
    ControlErrorsDirective,
    MayusculasDirective,
    CampoTextoGobmxComponent,
    ModalAvisoGobmxComponent,
    UsuarioNavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class SharedModule { }

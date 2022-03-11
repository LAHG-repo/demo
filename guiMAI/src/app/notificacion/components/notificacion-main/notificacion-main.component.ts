import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { NotificacionService } from 'src/app/shared/notificacion/notificacion.service';

@Component({
  selector: 'app-notificacion-main',
  templateUrl: './notificacion-main.component.html',
  styleUrls: ['./notificacion-main.component.scss'],
})
export class NotificacionMainComponent implements OnInit {
  constructor(private notificacionService: NotificacionService) {}

  onDestroy$ = new Subject<void>();
  formAmparo = new FormGroup({});
  formQoMoral = new FormGroup({});
  formQoFisica = new FormGroup({});
  formQoOtro = new FormGroup({});

  modelAmparo: any = {};
  modelQoMoral: any = {
    listQo: [{}],
  };
  modelQoFisica: any = {
    listQo: [{}],
  };
  modelQoOtro: any = {
    listQo: [{}],
  };

  tipoQo: string = '';

  fieldsAmparo: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: '',
          key: 'amparoContra',
          type: 'select',

          templateOptions: {
            label: 'Amparo contra',
            placeholder: 'Seleccionar',
            options: [
              { value: '1', label: 'Leyes' },
              { value: '2', label: 'Responsabilidad Patrimonial' },
              { value: '3', label: 'Licitación' },
              { value: '4', label: 'Temas Médicos' },
              { value: '5', label: 'Créditos Fiscales' },
              { value: '6', label: 'Derechos de Petición' },
            ],
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'pl-0 col-12 col-md-6 ',
          key: 'descripcionActo',
          type: 'textarea',
          templateOptions: {
            label: 'Descripción del acto',
            placeholder: '',
            rows: 5,
            required: true,
          },
        },
        {
          className: 'pr-0 col-12 col-md-6 ',

          key: 'acuerdoInicial',
          type: 'radio',
          templateOptions: {
            formCheck: 'inline',
            type: 'radio',
            label: 'Sentido del acuerdo inicial',
            required: true,
            name: 'acuerdoInicial',
            options: [
              { value: 'A', label: 'Admite' },
              { value: 'P', label: 'Previene' },
            ],
          },
        },
        {
          className: 'pl-0 col-12 col-md-6 ',
        },
        {
          className: 'pr-0 col-12 col-md-6 ',

          key: 'tipoQuejoso',
          type: 'radio',
          templateOptions: {
            formCheck: 'inline',
            type: 'radio',
            label: 'Tipo de quejoso',
            required: true,
            name: 'acuerdoInicial',
            options: [
              { value: 'M', label: 'Moral' },
              { value: 'F', label: 'Física' },
              { value: 'O', label: 'Otro' },
            ],
            change: (field, $event) => (this.tipoQo = $event.target.value),
          },
        },
      ],
    },
  ];

  fieldsQoMoral: FormlyFieldConfig[] = [
    {
      key: 'listQo',
      type: 'repeat',
      templateOptions: {
        addText: 'Agregar quejoso',
      },
      fieldArray: {
        fieldGroup: [
          {

            fieldGroupClassName: '',
            fieldGroup: [
              {
                className: 'pl-0 col-12 col-md-4 ',
                key: 'registroPatronal',
                type: 'input',

                templateOptions: {
                  label: 'Registro Patronal',
                  required: true,
                },
              },
              {
                className: 'pl-0 col-12 col-md-8 ',
                key: 'nombreQuejoso',
                type: 'input',
                templateOptions: {
                  label: 'Nombre del quejoso',
                  placeholder: '',

                  required: true,
                },
              },
            ],
          },
          {
            fieldGroupClassName: 'row form-inline',
            fieldGroup: [
              {
                className: 'col-md-auto',
                key: 'bRepresentante',
                type: 'checkbox',
                templateOptions: {
                  label: '',
                },
              },
              {
                className: 'col',
                key: 'representante',
                type: 'select',
                templateOptions: {
                  label: 'Lista de representantes',
                  placeholder: 'Seleccionar',
                  options: [
                    { value: '1', label: 'Rep 1' },
                    { value: '2', label: 'Rep 2' },
                  ],
                  required: true,
                },
              },

            ],
          },
        ],
      },
    },
  ];

  fieldsQoFisica: FormlyFieldConfig[] = [
    {
      key: 'listQo',
      type: 'repeat',
      templateOptions: {
        addText: 'Agregar quejoso',
      },
      fieldArray: {
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'pr-0 col-12 col-md-6 ',
                key: 'tipoFisica',
                type: 'radio',
                templateOptions: {
                  formCheck: 'inline',
                  type: 'radio',
                  label: '',
                  required: true,
                  name: 'tipoFisica',
                  options: [
                    { value: 'T', label: 'Trabajador' },
                    { value: 'A', label: 'Asegurado' },
                  ],
                  change: (field, $event) => console.warn($event.target.value),
                },
              },

            ],
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'pl-0 col-12 col-md-6 ',
                key: 'matriculaNss',
                type: 'input',
                templateOptions: {
                  label: 'Matrícula / NSS',
                  required: true,
                },
              },
              {
                className: 'pr-0 col-12 col-md-6 ',

              },
            ],
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'pl-0 col-12 col-md-6 ',
                key: 'nombreQuejoso',
                type: 'input',
                templateOptions: {
                  label: 'Nombre del quejoso',
                  required: true,
                },
              },
              {
                className: 'pl-0 col-12 col-md-3 ',
                key: 'apellidoPaterno',
                type: 'input',
                templateOptions: {
                  label: 'Apellido paterno',
                  required: true,
                },
              },
              {
                className: 'pl-0 col-12 col-md-3 ',
                key: 'apellidoMaterno',
                type: 'input',
                templateOptions: {
                  label: 'Apellido materno',
                  required: true,
                },
              },
            ],
          },
          {
            fieldGroupClassName: 'row form-inline',
            fieldGroup: [
              {
                className: 'col-md-auto',
                key: 'bRepresentante',
                type: 'checkbox',
                templateOptions: {
                  label: '',
                },
              },
              {
                className: 'col',
                key: 'representante',
                type: 'select',
                templateOptions: {
                  label: 'Lista de representantes',
                  placeholder: 'Seleccionar',
                  options: [
                    { value: '1', label: 'Rep 1' },
                    { value: '2', label: 'Rep 2' },
                  ],
                  required: true,
                },
              },
              {
                className: 'col col-lg-2',
                type: 'button',
                templateOptions: {
                  text: 'Registrar representante',
                  onClick: ($event) => alert('You clicked me!'),
                },
              },
            ],
          },
        ],
      },
    },
  ];

  fieldsQoOtro: FormlyFieldConfig[] = [
    {
      key: 'listQo',
      type: 'repeat',
      templateOptions: {
        addText: 'Agregar quejoso',
      },
      fieldArray: {
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'pr-0 col-12 col-md-6 ',
                key: 'nombreQuejoso',
                type: 'input',
                templateOptions: {
                  label: 'Nombre del quejoso',
                  required: true,
                  name: 'nombreQuejoso',
                },
              },
              {
                className: 'pr-0 col-12 col-md-6 ',

              },
            ],
          },
          {
            fieldGroupClassName: 'row form-inline',
            fieldGroup: [
              {
                className: 'col-md-auto',
                key: 'bRepresentante',
                type: 'checkbox',
                templateOptions: {
                  label: '',
                },
              },
              {
                className: 'col',
                key: 'representante',
                type: 'select',
                templateOptions: {
                  label: 'Lista de representantes',
                  placeholder: 'Seleccionar',
                  options: [
                    { value: '1', label: 'Rep 1' },
                    { value: '2', label: 'Rep 2' },
                  ],
                  required: true,
                },
              },
              {
                className: 'col col-lg-2',
                type: 'button',
                templateOptions: {
                  text: 'Registrar representante',
                  onClick: ($event) => alert('You clicked me!'),
                },
              },
            ],
          },
        ],
      },
    },
  ];

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.formAmparo.invalid ||
      this.formQoMoral.invalid ||
      this.formQoFisica.invalid ||
      this.formQoOtro.invalid
    ) {
      this.validaCamposFormulario([
        this.formAmparo,
        this.formQoMoral,
        this.formQoFisica,
        this.formQoOtro,
      ]);
      this.notificacionService.mostrarNotificacionError(
        'Debe completar los datos obligatorios'
      );
    } else {
      console.log(this.modelAmparo);
      console.log(this.modelQoMoral);
      console.log(this.modelQoFisica);
      console.log(this.modelQoOtro);
    }
  }

  onReset() {
    this.formAmparo.reset();
    this.formQoMoral.reset();
    this.formQoFisica.reset();
    this.formQoOtro.reset();
  }

  validaCamposFormulario(formGroups: FormGroup[]) {
    formGroups.forEach((formulario) => {
      Object.keys(formulario.controls).forEach((field) => {
        const control = formulario.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validaCamposFormulario([control]);
        }
      });
    });
  }
}

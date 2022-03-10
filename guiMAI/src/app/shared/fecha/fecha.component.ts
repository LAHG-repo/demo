import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FORMATO_MX } from 'src/app/shared/fecha/formato-mx';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';


@Component({
  selector: 'fecha-mx',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: FORMATO_MX }
  ]
})
export class FechaComponent implements OnInit, DoCheck, AfterContentChecked  {
  @Input() etiqueta: string;
  @Input() isMatError: boolean;
  @Input() placeholder: string;
  @Input() esOpcional: boolean;
  @Input() reset: boolean;

  @Output() fecha: EventEmitter<Date>;
  @Output() fechaCadena: EventEmitter<string>;

  @ViewChild(MatDatepicker)
  picker: MatDatepicker<any>;
  @ViewChild('inputFecha')
  inputFecha: ElementRef<any>;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.fecha = new EventEmitter();
    this.etiqueta = 'Fecha';
    this.placeholder = ''
    this.isMatError = false;
    this.fechaCadena = new EventEmitter();
    this.esOpcional = true;
    this.reset = false;
  }
  ngDoCheck(): void {
    if(this.reset){
      console.log('reseteando fecha');
      this.resetPicker();
    }
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }


  ngOnInit(): void {}

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const fecha = event.value || undefined;
    if(fecha){
      const str = moment(fecha).format('DD/MM/YYYY') || '';
      this.fecha.emit(moment(fecha).toDate() || null);
      this.fechaCadena.emit(str);
    }
  }

  resetPicker() {
    console.log("reset")
    this.picker.select(undefined);
    this.inputFecha.nativeElement.value='';
    this.fecha.emit(undefined);
    this.fechaCadena.emit('');
  }
}

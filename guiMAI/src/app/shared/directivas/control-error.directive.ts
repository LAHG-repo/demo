import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges, DoCheck, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SpanCampoObligatorioComponent } from '../span-campo-obligatorio/span-campo-obligatorio.component';
import { SpanErrorComponent } from '../span-error/span-error.component';


@Directive({
  selector: '[bordeValidacion]'
})
export class ControlErrorsDirective implements OnInit, DoCheck {
  @Input() mostrarError: boolean | null | undefined;
  @Input() mensaje: string | null;
  errorSpanId: string;

  constructor(private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngDoCheck(): void {
    if (this.mostrarError) {
      this.showError();
    } else {
      this.removeError();
    }
  }

  @Input('formControlName') formControlName: string;
  statusChangeSubscription: Subscription | undefined;


  ngOnInit(): void {
    setTimeout(()=>{
      this.errorSpanId = `error-${this.formControlName}${Date.now()}`;
    },10);
  }

  private showError() {
    this.removeError();
    let componentFactory: any;
    let componentRef :any;
    if(this.mensaje){
      componentFactory = this.componentFactoryResolver
    .resolveComponentFactory(SpanErrorComponent);
      componentRef = this.viewContainerRef.createComponent(componentFactory);
      componentRef.instance.msgError = this.mensaje;
    }else{
      componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(SpanCampoObligatorioComponent);
      componentRef = this.viewContainerRef.createComponent(componentFactory);
    }

    const host = this.elRef.nativeElement as HTMLElement;
    const span = componentRef.location.nativeElement
    span.id = this.errorSpanId;
    host.parentElement?.insertAdjacentElement('beforeend', span);
    this.elRef.nativeElement.classList.add('border-validate');
  }


  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      this.elRef.nativeElement.classList.remove('border-validate');
      errorElement.remove();
    }
  }


}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize, takeUntil } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service';
import { ActivationEnd, Router } from '@angular/router';
import { NotificacionService } from './../notificacion/notificacion.service';
import { HttpCancelService } from './http-cancel.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private count = 0;
  private excludeService: Array<string> = ['api/catalogo', 'msTss-auth/v1/oauth/token'];

  private readonly timeoutUrl = '/main';

  constructor(
    private spinnerService: SpinnerService,
    private token: TokenStorageService,
    private router: Router,
    private notificacionService: NotificacionService,
    private httpCancelService: HttpCancelService
  ) {
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.esFechaExpirada()) {
      setTimeout(() => {
        this.spinnerService.detenerSpinner();
      });
      return next.handle(request).pipe(
        takeUntil(this.httpCancelService.onCancelPendingRequests())
      );
    }

    this.spinnerService.llamarSpinner();
    this.count++;

    if (this.isServiceExcluded(request.url) === true) {
      return next.handle(request).pipe(
        finalize(() => {
          this.count--;

          if (this.count === 0) {
            setTimeout(() => {
              this.spinnerService.detenerSpinner();
            }, 100);
          }
        })
      );
    }

    request = this.verificarToken(request);
    return next.handle(request).pipe(
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          setTimeout(() => {
            this.spinnerService.detenerSpinner();
          }, 100);
        }
      })
    );
  }

  private verificarToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.token.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
      //console.log('agregando token', token, request)
    }
    return request;
  }

  private isServiceExcluded(url: string): boolean {
    const found = this.excludeService.filter((service) => {
      if (url.includes(service)) {
        return service;
      }
    });
    return found.length > 0;
  }

  private esFechaExpirada(): boolean {
    const expiracion = this.token.getFechaExpiracionToken();
    //console.log('fechas intercepror', expiracion?.getTime(), new Date().getTime())
    if (expiracion && expiracion.getTime() < new Date().getTime()) {
      this.token.limpiarSesion();
      this.router.navigateByUrl(this.timeoutUrl);
      this.notificacionService.mostrarNotificacionError('La sesión ha caducado');
      return true;
    }
    return false;
  }
}

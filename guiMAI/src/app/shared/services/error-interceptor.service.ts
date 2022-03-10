import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { NotificacionService } from './../notificacion/notificacion.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  private readonly onErrorUrl = '/main';

  constructor(
    private route: Router,
    private notificacionService: NotificacionService,
    private tokenStorageService: TokenStorageService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].includes(err.status)
        ) {
          console.log('sin autorizacion', err.status, this.route)
          // al arrojar erroes 401 or 403
          setTimeout(() => {
            this.notificacionService.mostrarNotificacionError(`No es posible continuar, la sesión ha expirado o no tiene permisos para ver este recurso`);
          }, 500);
          this.tokenStorageService.limpiarSesion();
          this.route.navigateByUrl(this.onErrorUrl);
          return of(err);
        } else if (404 === err.status) {
          setTimeout(() => {
            this.notificacionService.mostrarNotificacionError(`El recurso ${err.url} no existe`);
          }, 100);

          return of(err);
        }

        return throwError(err);
      }))
  }

}

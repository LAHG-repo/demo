import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  logeado: boolean = false;

  private readonly returnUrl = '/main';

  constructor(
    private router: Router,
    private tokenStorageService:TokenStorageService
  ) {
    TokenStorageService.estaLogeado.subscribe(respuesta => {
      this.logeado = respuesta;
    })

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.logeado) {
      return true;
    } else {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.returnUrl]);
      return false;
    }
  }
}

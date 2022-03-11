import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, shareReplay } from 'rxjs/operators';
import { Utils } from './../utils';
import { ModalService } from 'src/app/shared/modalgobmx/modal.service';
import { SessionStorageService } from 'ngx-webstorage';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-usuario-navbar',
  templateUrl: './usuario-navbar.component.html',
  styleUrls: ['./usuario-navbar.component.scss']
})
export class UsuarioNavbarComponent implements OnInit {

  estaLogeado: boolean;
  usuario: any;
  info: any;

  private readonly _paginaInicio = '/consultaCandidato';
  private readonly urls: Array<string> = ['/consulta', '/detalleConsulta', this._paginaInicio];

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: Router,
    private modalService: ModalService,
    private session: SessionStorageService,
    private location: LocationStrategy
  ) {
    location.onPopState(() => {
      const url = location.path()
      if(url && (this.urls.includes(url) === true)){
        this.tokenStorageService.limpiarSesion();
        this.session.clear();
        this.estaLogeado = false;
      }
    });
  }

  ngOnInit(): void {
    //this._verificarRuta();
    TokenStorageService.estaLogeado.pipe(shareReplay(1)).subscribe(valor => {
      this.estaLogeado = valor;
      if (this.estaLogeado) {
        setTimeout(() => {
          this.usuario = this.tokenStorageService.getUser();
          this.info = this.tokenStorageService.getInfoUsuario();
          console.log('usuario logeado', this.info)
        });

      }
    });
  }

  doCerrarSesion(): void {
    this.modalService.mostrarConfirmacion('',
      '¿Deseas salir de la tabla de registro de mineros?',
      'Cancelar', 'Aceptar',
      () => {
        this.tokenStorageService.limpiarSesion();
        this.session.clear();
        this.route.navigateByUrl(this._paginaInicio);
        this.estaLogeado = false;
        setTimeout(() => {
          Utils.scrollTo('principal');
        }, 100);
      });


  }

  private _verificarRuta(){
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event:any) => {
        if(event && (this.urls.includes(event.url) === false)){
          this.tokenStorageService.removerToken();
          this.estaLogeado = false;
        }
        console.log(event);
      });
  }
}

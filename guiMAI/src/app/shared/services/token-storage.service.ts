import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'nombre';
const EXPIRA_KEY = 'expires_in';
const FECHA_LOGEO = 'fecha_logeo';
const INFO_KEY = 'info';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public static estaLogeado:BehaviorSubject<boolean>;

  constructor() {
    const token = this.getToken()
    TokenStorageService.estaLogeado = new BehaviorSubject<boolean>(token ? true : false);
  }

  limpiarSesion(): void {
    window.sessionStorage.clear();
    TokenStorageService.estaLogeado.next(false);
  }

  public saveTokenExpiracion(tiempo: string): void {
    window.sessionStorage.removeItem(EXPIRA_KEY);
    window.sessionStorage.setItem(EXPIRA_KEY, tiempo);
  }

  public saveToken(token: string): void {
    if(token){
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.removeItem(FECHA_LOGEO);
      window.sessionStorage.setItem(TOKEN_KEY, token);
      window.sessionStorage.setItem(FECHA_LOGEO, ''+new Date().getTime());
      this.decryptInfo();
      TokenStorageService.estaLogeado.next(true);
      //console.log('tiempo logeo',window.sessionStorage.getItem(FECHA_LOGEO))
    }
  }

  public saveRefreshToken(token: string): void {
    if(token){
      window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      window.sessionStorage.removeItem(FECHA_LOGEO);
      window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
      window.sessionStorage.setItem(FECHA_LOGEO, ''+new Date().getTime());
      this.decryptInfo();
      TokenStorageService.estaLogeado.next(true);

    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public getTokenExpiracion(): string | null {
    return window.sessionStorage.getItem(EXPIRA_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): string {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }

    return '';
  }

  public getFechaExpiracionToken(): Date | undefined{
    const fechaLogeo = this.tiempoAFecha();
    const tiempo = this.getTokenExpiracion();
    if(tiempo && fechaLogeo){
      const date = fechaLogeo
      date.setUTCSeconds(date.getSeconds() + +tiempo);
      //console.log('fecha de expiracion', date.toLocaleDateString(), date.toLocaleTimeString())
      return date;
    }
    return undefined;
  }

  public getInfoUsuario(): any{
    const datos = window.sessionStorage.getItem(INFO_KEY);
    if(datos){
      return JSON.parse(datos);
    }

    return {}
  }

  public removerToken(){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(FECHA_LOGEO);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.removeItem(EXPIRA_KEY);
    TokenStorageService.estaLogeado.next(false);
  }

  private decryptInfo():void {
    let decoded = jwt_decode(this.getToken() || '');
    window.sessionStorage.setItem(INFO_KEY, JSON.stringify(decoded));
  }

  private tiempoAFecha(): Date | undefined{
    const tiempo = window.sessionStorage.getItem(FECHA_LOGEO);
    if(tiempo){
      const timeStamp = +tiempo;
      return new Date(timeStamp);
    }
    return undefined;
  }
}

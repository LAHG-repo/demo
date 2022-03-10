import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

const AUTH_API = `${environment.apiAuth}`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa('encuesta-gui' + ':' + '1mssENC*01')//Buffer.from('imssApp'+':'+'12345678', 'base64')
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  login(usuario: string, contrasenia: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario);
    params.set('password', contrasenia);

    return this.http.post(`${AUTH_API}/oauth/token`, params, httpOptions).pipe(shareReplay(1));
  }

  actualizarContrasenia(password: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('refClave', password);
    return this.http.put(`${AUTH_API}/user/primeracceso?${params.toString()}`, {});
  }

  refrescarToken(refreshToken: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', refreshToken);
    return this.http.post(`${AUTH_API}/oauth/token`, params, httpOptions).pipe(shareReplay(1));
  }
}

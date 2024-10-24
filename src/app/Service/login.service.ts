import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../Models/login.model';
import { AuthModel } from '../Models/auth.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private _token = inject(TokenService);
  private _http = inject(HttpClient);
  private apiURL = "https://gymappjr.azurewebsites.net/api/Auth"

  getAuth(login: LoginModel){
    return this._http.post<AuthModel>(this.apiURL,login)
      .pipe(
        tap(response => this._token.saveToken(response.token)),
        catchError(this.handleError)
      );
  }

  //manejador de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `${error.error.message}`;
    } else if (error.error) {
      // Error devuelto por el backend
      errorMessage = `${error.error.Message || error.error.message || error.message}`;
    } else {
      // Otro tipo de error
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    // Devuelve un observable con un mensaje de error amigable para el usuario
    return throwError(() => new Error(errorMessage));
  }
}

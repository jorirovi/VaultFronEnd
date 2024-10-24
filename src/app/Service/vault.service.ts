import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { vault } from '../Models/vault.model';
import { catchError, throwError } from 'rxjs';
import { EliminarModel } from '../Models/eliminar.model';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor() { }
  private _http = inject(HttpClient)
  private _token = inject(TokenService)
  private urlAPI = "https://gymappjr.azurewebsites.net/api/Vault"

  getJoyas(){
    return this._http.get<vault[]>(this.urlAPI,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  getJoya(id: string){
    return this._http.get<vault>(`${this.urlAPI}/${id}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  AddJoya(entity: vault){
    return this._http.post<vault>(this.urlAPI,entity,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  DeleteJoya(id: string){
    return this._http.delete<EliminarModel>(`${this.urlAPI}/${id}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  UpdateJoya(entity: vault){
    return this._http.put<vault>(this.urlAPI,entity,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
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

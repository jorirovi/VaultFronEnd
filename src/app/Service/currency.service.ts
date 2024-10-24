import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { currency } from '../Models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _http = inject(HttpClient);
  private urlAPI = "https://api.apyhub.com/data/convert/currency";
  private tokenAPI = "APT0FypJpy3uhQCfu2RZcyXheF7O2mUGPgiLCGQenqtvkO4a";

  convertCurrency(source: string, target: string): Observable<currency> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apy-token': this.tokenAPI
    });

    const body = {
      source: source,
      target: target
    };

    return this._http.post<currency>(this.urlAPI, body, { headers});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=d335da3c7d896fa8d25e9b2cc6f90c82&units=metric`;
    return this.http.get<any>(url);
  }

  getCurrenci(): Observable<any> {
    return this.http.get<any>('https://api.exchangerate-api.com/v4/latest/COP');
  }
}

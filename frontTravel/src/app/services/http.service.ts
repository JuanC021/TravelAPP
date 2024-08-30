import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// esta clase se marca como un servicio que se puede inyectar en cualquier parte de la aplicación.
@Injectable({
  providedIn: 'root' 
})
export class HttpService {

  // Se define la URL de la API del clima que se utilizará para obtener información del clima.
  private weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';

  // Define la URL del backend local donde se alojan las rutas de la API.
  private localApiUrl = 'http://localhost:8000/api'; // Dirección del backend


  // El constructor inyecta el servicio HttpClient para poder hacer peticiones HTTP.
  constructor(private http: HttpClient) { }


  // Este método obtiene la información del clima de una ciudad específica.
  getWeather(city: string): Observable<any> {
    // Construye la URL completa para la petición, incluyendo la ciudad y la clave API.
    const url = `${this.weatherApiUrl}?q=${city}&appid=d335da3c7d896fa8d25e9b2cc6f90c82&units=metric`;
    // Hace una petición GET a la API del clima y retorna un observable con la respuesta.
    return this.http.get<any>(url);
  }

  // Este método obtiene la tasa de cambio de la moneda colombiana (COP).
  getCurrenci(): Observable<any> {
    return this.http.get<any>('https://api.exchangerate-api.com/v4/latest/COP');
  }

  // Este método obtiene la lista de ciudades desde el backend, que esta conectado a la BD Sql
  getCities(): Observable<any> {
    return this.http.get<any>(`${this.localApiUrl}/cities`);
  }
}

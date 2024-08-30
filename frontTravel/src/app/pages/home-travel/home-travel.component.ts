import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-travel',
  templateUrl: './home-travel.component.html',
  styleUrls: ['./home-travel.component.css']
})
export class HomeTravelComponent implements OnInit {

  // Datos de ciudades obtenidos desde el backend
  cities: any[] = [];
  currencySymbolMap: any = {}; // Mapa de símbolos de cada moneda

  // Estado de la animación de carga e interfaz de la alerta
  loading: boolean = false;
  showAlert: boolean = false;

  // Constructor para inicializar servicios y formularios
  constructor(
    private fb: FormBuilder, // Servicio para crear formularios reactivos
    private httpService: HttpService, // Servicio para hacer peticiones HTTP
    private router: Router // Servicio para la navegación entre rutas
  ) { }

  // Formulario reactivo
  form!: FormGroup;

  // Inicializa el componente y el formulario
  ngOnInit(): void {
    this.initForm();
    this.loadCities(); // Carga las ciudades desde el backend
  }

  // Configura el formulario con campos de ciudad y dinero
  initForm(): void {
    this.form = this.fb.group({
      city: ['', Validators.required],
      money: [null, Validators.required]
    });
  }

  // Obtiene el control de la ciudad del formulario
  get city() {
    return this.form.get('city');
  }

  // Obtiene el control del dinero del formulario
  get money() {
    return this.form.get('money');
  }

  // Maneja el envío del formulario
  async onSubmit() {

    // Si el formulario no es válido, muestra una alerta
    if (this.form.invalid) {
      this.showAlert = true;

      // Función para ocultar la alerta después de 1.5 segundos
      setTimeout(() => {
        this.showAlert = false;
      }, 1500);

      return;
    }

    this.showAlert = false; // Oculta la alerta si el formulario es válido
    this.loading = true; // Muestra el indicador de carga
    try {
      // Obtiene los valores del formulario
      const cityValue = this.city?.value;
      const moneyValue = this.money?.value;
      
      // Encuentra la ciudad seleccionada en el array de ciudades
      const selectedCity = this.cities.find(city => city.name === cityValue);
      if (!selectedCity) {
        throw new Error('Ciudad no encontrada en los datos.');
      }
      
      const localMoney = selectedCity.currency;
      const currencySymbol = selectedCity.symbol;
      
      // Obtiene el clima para la ciudad seleccionada
      const weather = await this.getWeather(cityValue);
      const tempCity = weather.main.temp;

      // Obtiene la tasa de cambio de moneda
      const currency = await this.getCurrency();
      const ratesCurrency = currency.rates[localMoney];

      // Crea un objeto con la información recopilada
      const info: any = {
        city: cityValue,
        tempCity,
        money: moneyValue,
        localMoney,
        ratesCurrency,
        currencySymbol
      };

      console.log(info); // Muestra la información en la consola para tener un seguimiento
      localStorage.setItem('data', JSON.stringify(info)); // Guarda la información en el cache del navegador
      this.router.navigateByUrl('info-travel'); // Navega a la página de información de viaje
      
    } catch (error) {
      console.error('Error al obtener los datos:', error); // Si ocurre un error lo pinta en la consola
    } finally {
      this.loading = false; // Oculta el indicador de carga.
    }
  }

  // Obtiene el clima de una ciudad usando el servicio HTTP
  private getWeather(city: string): Promise<any> {
    return this.httpService.getWeather(city).toPromise();
  }

  // Obtiene la tasa de cambio de moneda usando el servicio HTTP
  private getCurrency(): Promise<any> {
    return this.httpService.getCurrenci().toPromise();
  }

  // Carga las ciudades desde el backend
  private loadCities(): void {
    this.httpService.getCities().subscribe(
      data => {
        this.cities = data.cities; // Ajusta esto según la estructura de la respuesta
        this.currencySymbolMap = data.cities.reduce((map: any, city: any) => {
          map[city.currency] = city.symbol;
          return map;
        }, {});
      },
      error => {
        console.error('Error al obtener las ciudades:', error);
      }
    );
  }
}

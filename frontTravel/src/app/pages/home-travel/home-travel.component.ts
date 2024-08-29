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

  //mapa de ciudades a la moneda local de cada una
  citiesCurrency:any = {
    London: 'GBP',     
    'New York': 'USD',      // se coloca entre comillas, ya que el formato de TypeScript lo exige cuando se tiene espacios.
    Paris: 'EUR',        
    Tokyo: 'JPY',        
    Madrid: 'EUR'        
  };


  // Mapa de símbolos de cada moneda
  currencySymbolMap: any = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    JPY: '¥'
  };

// Estado de la animacion de carga e interfez de la alerta
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

  // Con este parametro nicializa el componente y el formulario
  ngOnInit(): void {
    this.initForm()
  }

// Configura el formulario con campos de ciudad y dinero
  initForm(): void {
    this.form = this.fb.group({
      city: ['', Validators.required],
      money: [null,Validators.required]
    })
  }

  // Obtiene el control de la ciudad del formulario
  get city() {
    return this.form.get('city');
  }
  // Obtiene el control del dinero del formulario
  get money() {
    return this.form.get('money');
  }


  //En esta parte se maneja el envío del formulario
  async onSubmit() {

    // si el formulario no es valido como por ejemplo no se lleno alguncampo, mostrara una alerta
    if (this.form.invalid) {
      this.showAlert = true; 

      // funcion para ocultar la alerta despues de 1.5 segundos
      setTimeout(() => {
        this.showAlert = false;
      }, 1500);

      return;
    }

    this.showAlert = false;  // Oculta la alerta si el formulario es válido
    this.loading = true; // Muestra el indicador de carga
    try {
      // Obtiene los valores del formulario
      const cityValue = this.city?.value;
      const localMoney = this.citiesCurrency[cityValue];
      
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
        money: this.money?.value,
        localMoney,
        ratesCurrency,
        currencySymbol: this.currencySymbolMap[localMoney]
      };
  
      console.log(info); // Muestra la información en la consola para tener un seguimiento
      localStorage.setItem('data', JSON.stringify(info)); // Guarda la información en el cache del navegador
      this.router.navigateByUrl('info-travel') // Navega a la página de información de viaje
      
    } catch (error) {
      console.error('Error al obtener los datos:', error); // si ocurre un error lo pinta en la consola
    } finally {
      this.loading = false;  // Oculta el indicador de carga.
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

}

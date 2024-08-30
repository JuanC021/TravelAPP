import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-travel',
  templateUrl: './info-travel.component.html',
  styleUrls: ['./info-travel.component.css']
})
export class InfoTravelComponent implements OnInit {

  public infoTravel: any;

  constructor(private router: Router) { }

  // Método que se ejecuta cuando se inicializa el componente.
  ngOnInit(): void {

    // Recupera los datos del almacenamiento local
    const dataLocalStorage: any = localStorage.getItem('data');

     // Verifica si hay datos en el localStorage y si es así, los convierte de texto a objeto JSON y los asigna a la variable 'infoTravel'.
    if (dataLocalStorage) {
      this.infoTravel = JSON.parse(dataLocalStorage);
      console.log(this.infoTravel);
    } 
  }

  // Método para navegar de vuelta a la página principal.
  goBack() {
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-travel',
  templateUrl: './info-travel.component.html',
  styleUrls: ['./info-travel.component.css']
})
export class InfoTravelComponent implements OnInit {

  public infoTravel: any; 


  //Un mapa que asocia códigos de moneda (como GBP, USD, EUR, JPY) con sus respectivos símbolos (£, $, €, ¥). Utilizado para determinar el símbolo correcto para la moneda local.
  private currencySymbolMap: { [key: string]: string } = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    JPY: '¥'
  };



  constructor(private router: Router) { }

  ngOnInit(): void {

    // Recupera los datos del almacenamiento local
    const dataLocalStorage: any = localStorage.getItem('data');
    if (dataLocalStorage) {
      this.infoTravel = JSON.parse(dataLocalStorage);
      console.log(this.infoTravel);

      // Asigna el símbolo de la moneda local
      if (this.infoTravel && this.infoTravel.localMoney) {
        this.infoTravel.currencySymbol = this.currencySymbolMap[this.infoTravel.localMoney] || '';
      }
    } 
  }



  goBack() {
    this.router.navigate(['/']); 
  }

}

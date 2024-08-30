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

  ngOnInit(): void {

    // Recupera los datos del almacenamiento local
    const dataLocalStorage: any = localStorage.getItem('data');
    if (dataLocalStorage) {
      this.infoTravel = JSON.parse(dataLocalStorage);
      console.log(this.infoTravel);
    } 
  }

  goBack() {
    this.router.navigate(['/']);
  }

}

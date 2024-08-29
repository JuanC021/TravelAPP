import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTravelComponent } from './pages/home-travel/home-travel.component';
import { InfoTravelComponent } from './pages/info-travel/info-travel.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full' ,component: HomeTravelComponent
  },
  {
    path: 'info-travel', component: InfoTravelComponent
  },
  {
    path: '**', pathMatch: 'full' ,component: HomeTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

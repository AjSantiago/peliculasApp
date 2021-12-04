import { Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  cartelera: any;
  populares: any;
  kids: any;

  constructor(private _peliculas: PeliculasService, private _router: Router) {
    this._peliculas.getCartelera().subscribe((data: any) => {
      this.cartelera = data[0]['results'];
    });

    this._peliculas.getPopulares().subscribe((data: any) => {
      this.populares = data[0]['results'];
    });

    this._peliculas.getKidsPopulares().subscribe((data: any) => {
      this.kids = data[0]['results'];
    });
  }
}

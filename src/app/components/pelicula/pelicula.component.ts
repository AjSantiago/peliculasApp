import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
})
export class PeliculaComponent {
  pelicula: any;
  id: any = '';
  origen: any;

  constructor(
    private _peliculasService: PeliculasService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.origen = params.get('origen');
    });

    this.pelicula = this._peliculasService.getPelicula(this.id, this.origen);
  }

  regresarA() {
    if (
      this.origen === 'cartelera' ||
      this.origen === 'populares' ||
      this.origen === 'kids'
    ) {
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/search', this.origen]); //Se envía de regreso la palabra buscada
    }
  }
}

import { Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  moviesSearch: any;
  buscar: any;

  constructor(
    private _peliculasService: PeliculasService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.get('buscar')) {
        this.buscar = params.get('buscar');
        this.buscarPelicula();
      }
    });
  }

  buscarPelicula() {
    if (this.buscar.length > 0) {
      this._peliculasService
        .getPeliculas(this.buscar)
        .subscribe((data: any) => {
          this.moviesSearch = data;
          let t = this.moviesSearch.length - 1;
          this.moviesSearch = data[t]['results'];
        });
    }
  }

  verPelicula(idx: number) {
    //this._router.navigate(['/pelicula', idx, 'search']);
    this._router.navigate(['/pelicula', idx, this.buscar]); //Se envía la palabra buscada
  }
}

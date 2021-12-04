import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent {
  @Input('peliculas') peliculas: any;
  @Input('titulo') titulo: string = '';
  @Input('origen') origen: any;

  constructor(private _router: Router) {}

  verPelicula(idx: number) {
    this._router.navigate(['/pelicula', idx, this.origen]);
  }
}

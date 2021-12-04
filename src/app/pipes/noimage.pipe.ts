import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage',
})
export class NoimagePipe implements PipeTransform {
  transform(pelicula: any): any {
    let poster = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

    if (pelicula.backdrop_path) {
      return poster + pelicula.backdrop_path;
    } else {
      if (pelicula.poster_path) {
        return poster + pelicula.poster_path;
      } else {
        return 'assets/img/noimage.png';
      }
    }
  }
}

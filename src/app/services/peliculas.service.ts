import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  urlMovieDB: string = 'https://api.themoviedb.org/3';
  api_key: string = '4fad1d998f12e90682bc546e6add545b';

  popularMovies = '/discover/movie?sort_by=popularity.desc';
  popularKidsMovies =
    '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';

  cartelera = new Array();
  populares = new Array();
  kids = new Array();
  moviesSearch = new Array();

  constructor(private _http: HttpClient) {
    //console.log('Servicio listo');
  }

  getCartelera() {
    let date1 = new Date();
    let date_gte: string;
    date1.setDate(date1.getDate() - 20);
    if (date1.getDate() < 10) {
      date_gte = `${date1.getFullYear()}-${
        date1.getMonth() + 1
      }-0${date1.getDate()}`;
    } else {
      date_gte = `${date1.getFullYear()}-${
        date1.getMonth() + 1
      }-${date1.getDate()}`;
    }

    let date2 = new Date();
    let date_lte: string;
    date2.setDate(date2.getDate() + 10);
    if (date2.getDate() < 10) {
      date_lte = `${date2.getFullYear()}-${
        date2.getMonth() + 1
      }-0${date2.getDate()}`;
    } else {
      date_lte = `${date2.getFullYear()}-${
        date2.getMonth() + 1
      }-${date2.getDate()}`;
    }

    let inTheatres = `/discover/movie?primary_release_date.gte=${date_gte}&primary_release_date.lte=${date_lte}`;

    let url = `${this.urlMovieDB}${inTheatres}&api_key=${this.api_key}&language=es&callback=JSONP_CALLBACK`;

    return this._http.jsonp(url, 'getCartelera').pipe(
      map((data) => {
        this.cartelera.length = 0;
        this.cartelera.push(data);
        return this.cartelera;
      })
    );
  }

  getPopulares() {
    let url = `${this.urlMovieDB}${this.popularMovies}&api_key=${this.api_key}&language=es&callback=JSONP_CALLBACK`;

    return this._http.jsonp(url, 'getPopulares').pipe(
      map((data) => {
        this.populares.length = 0;
        this.populares.push(data);
        return this.populares;
      })
    );
  }

  getKidsPopulares() {
    let url = `${this.urlMovieDB}${this.popularKidsMovies}&api_key=${this.api_key}&language=es&callback=JSONP_CALLBACK`;

    return this._http.jsonp(url, 'getKidsPopulares').pipe(
      map((data) => {
        this.kids.length = 0;
        this.kids.push(data);
        return this.kids;
      })
    );
  }

  getPeliculas(termino: string) {
    let url = `${this.urlMovieDB}/search/movie?api_key=${this.api_key}&query=${termino}&language=es&callback=JSONP_CALLBACK`;

    return this._http.jsonp(url, 'getPeliculas').pipe(
      map((data) => {
        this.moviesSearch.push(data);
        return this.moviesSearch;
      })
    );
  }

  getPelicula(idx: number, origen: string) {
    if (origen === 'cartelera') {
      return this.cartelera[0].results[idx];
    }
    if (origen === 'populares') {
      return this.populares[0].results[idx];
    }
    if (origen === 'kids') {
      return this.kids[0].results[idx];
    }
    //if (origen === 'search') {
    let t = this.moviesSearch.length - 1;
    return this.moviesSearch[t].results[idx];
    //}
  }
}

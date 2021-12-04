import { Routes, RouterModule } from '@angular/router';
//import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:buscar', component: SearchComponent },
  { path: 'pelicula/:id/:origen', component: PeliculaComponent },
  { path: 'pelicula/:id/:origen/:peliculas', component: PeliculaComponent },
  { path: '**', component: HomeComponent },
];
export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

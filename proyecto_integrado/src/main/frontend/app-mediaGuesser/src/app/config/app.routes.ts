import { Routes } from '@angular/router';
import {AppComponent} from "../app.component";
import {HomeComponent} from "../components/home/home.component";
import {ReadComponent} from "../components/crud/read/read.component";
import {createComponent} from "@angular/core";
import {CreateComponent} from "../components/crud/create/create.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio'
  },
  {
    path: 'panel',
    component: ReadComponent,
    title: 'Panel de administración'
  },
  {
    path: 'panel/:entity',
    component: ReadComponent,
    title: 'Panel de administración',
  },
  {
    path: 'panel/:entity/create',
    component: CreateComponent,
    title: 'Añadir nuevo'
  }
];

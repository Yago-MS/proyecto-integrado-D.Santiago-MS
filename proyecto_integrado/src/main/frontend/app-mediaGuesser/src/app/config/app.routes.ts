import { Routes } from '@angular/router';
import {AppComponent} from "../app.component";
import {HomeComponent} from "../components/home/home.component";
import {ReadComponent} from "../components/crud/read/read.component";
import {createComponent} from "@angular/core";
import {CreateMediaComponent} from "../components/crud/create/create-media/create-media.component";
import {CreateUserComponent} from "../components/crud/create/create-user/create-user.component";
import {CreateMediaTypeComponent} from "../components/crud/create/create-media-type/create-media-type.component";
import {CreateUserTypeComponent} from "../components/crud/create/create-user-type/create-user-type.component";

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
    path: 'panel/media/create',
    component: CreateMediaComponent,
    title: 'Añadir nuevo medio'
  },
  {
    path: 'panel/user/create',
    component: CreateUserComponent,
    title: 'Añadir nuevo usuario'
  },
  {
    path: 'panel/mediaType/create',
    component: CreateMediaTypeComponent,
    title: 'Añadir nuevo tipo de medio'
  },
  {
    path: 'panel/userType/create',
    component: CreateUserTypeComponent,
    title: 'Añadir nuevo tipo de usuario'
  },
];

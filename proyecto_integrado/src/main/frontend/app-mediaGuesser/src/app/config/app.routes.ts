import {Routes} from '@angular/router';
import {AppComponent} from "../app.component";
import {HomeComponent} from "../components/home/home.component";
import {ReadComponent} from "../components/crud/read/read.component";
import {createComponent} from "@angular/core";
import {CreateMediaComponent} from "../components/crud/create/create-media/create-media.component";
import {CreateUserComponent} from "../components/crud/create/create-user/create-user.component";
import {CreateMediaTypeComponent} from "../components/crud/create/create-media-type/create-media-type.component";
import {CreateUserTypeComponent} from "../components/crud/create/create-user-type/create-user-type.component";
import {LoginComponent} from "../components/login/login.component";
import {UpdateMediaComponent} from "../components/crud/update/update-media/update-media.component";
import {UpdateMediaTypeComponent} from "../components/crud/update/update-media-type/update-media-type.component";
import {UpdateUserComponent} from "../components/crud/update/update-user/update-user.component";
import {UpdateUserTypeComponent} from "../components/crud/update/update-user-type/update-user-type.component";

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
  {
    path: 'panel/media/:id',
    component: UpdateMediaComponent,
    title: 'Editando medio'
  },
  {
    path: 'panel/mediaType/:id',
    component: UpdateMediaTypeComponent,
    title: 'Editando tipo de medio'
  },
  {
    path: 'panel/user/:id',
    component: UpdateUserComponent,
    title: 'Editando usuario'
  },
  {
    path: 'panel/userType/:id',
    component: UpdateUserTypeComponent,
    title: 'Editando tipo de usuario'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'iniciar sesión'
  }
];

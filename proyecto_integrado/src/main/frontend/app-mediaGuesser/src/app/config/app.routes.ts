import {Routes} from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {ReadComponent} from "../components/crud/read/read.component";
import {CreateMediaComponent} from "../components/crud/create/create-media/create-media.component";
import {CreateUserComponent} from "../components/crud/create/create-user/create-user.component";
import {CreateMediaTypeComponent} from "../components/crud/create/create-media-type/create-media-type.component";
import {CreateUserTypeComponent} from "../components/crud/create/create-user-type/create-user-type.component";
import {UpdateMediaComponent} from "../components/crud/update/update-media/update-media.component";
import {UpdateMediaTypeComponent} from "../components/crud/update/update-media-type/update-media-type.component";
import {UpdateUserComponent} from "../components/crud/update/update-user/update-user.component";
import {UpdateUserTypeComponent} from "../components/crud/update/update-user-type/update-user-type.component";
import {AdminGuard} from "../../utils/admin.guard";
import {AccesDeniedComponent} from "../components/guards/acces-denied/acces-denied.component";
import {GameComponent} from "../components/game/game.component";
import {ScoresComponent} from "../components/scores/scores.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio'
  },
  {
    path: 'game',
    component: GameComponent,
    title: 'Media-guesser'
  },
  {
    path: 'game/:mode',
    component: GameComponent,
    title: 'Media-guesser'
  },
  {
    path: 'panel',
    component: ReadComponent,
    title: 'Panel de administración',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/:entity',
    component: ReadComponent,
    title: 'Panel de administración',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/media/create',
    component: CreateMediaComponent,
    title: 'Añadir nuevo medio',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/user/create',
    component: CreateUserComponent,
    title: 'Añadir nuevo usuario',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/mediaType/create',
    component: CreateMediaTypeComponent,
    title: 'Añadir nuevo tipo de medio',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/userType/create',
    component: CreateUserTypeComponent,
    title: 'Añadir nuevo tipo de usuario',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/media/:id',
    component: UpdateMediaComponent,
    title: 'Editando medio',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/mediaType/:id',
    component: UpdateMediaTypeComponent,
    title: 'Editando tipo de medio',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/user/:id',
    component: UpdateUserComponent,
    title: 'Editando usuario',
    canActivate: [AdminGuard]
  },
  {
    path: 'panel/userType/:id',
    component: UpdateUserTypeComponent,
    title: 'Editando tipo de usuario',
    canActivate: [AdminGuard]
  },
  {
    path: 'access-denied',
    component: AccesDeniedComponent,
    title: 'acceso denegado'
  },
  {
    path: 'top',
    component: ScoresComponent,
    title: 'salon de la fama'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

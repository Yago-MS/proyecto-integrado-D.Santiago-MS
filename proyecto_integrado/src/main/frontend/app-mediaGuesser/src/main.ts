import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { AppComponent } from './app/app.component';
import {routes} from "./app/config/app.routes";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers:[
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideNoopAnimations()
  ]
}).catch((err) => console.error(err));

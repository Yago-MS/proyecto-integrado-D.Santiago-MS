import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { AppComponent } from './app/app.component';
import {routes} from "./app/config/app.routes";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers:[
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));

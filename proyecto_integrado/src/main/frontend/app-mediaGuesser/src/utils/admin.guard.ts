import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
    if (await this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}

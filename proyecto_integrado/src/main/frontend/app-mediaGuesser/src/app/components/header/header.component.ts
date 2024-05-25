import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService} from "../../../utils/services/auth.service";
import { NgIf } from "@angular/common";
import { UserMenuComponent } from "../user-menu/user-menu.component";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('userMenu') userMenu: ElementRef | undefined;

  isAdmin: boolean = false;
  user = JSON.parse(sessionStorage.getItem('user') || '{}');
  isMenuOpen: boolean = false;
  protected readonly sessionStorage = sessionStorage;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    if (sessionStorage.getItem('user')) {
      this.isAdmin = await this.authService.isAdmin();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMenuOpen && this.userMenu && !this.userMenu.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

}

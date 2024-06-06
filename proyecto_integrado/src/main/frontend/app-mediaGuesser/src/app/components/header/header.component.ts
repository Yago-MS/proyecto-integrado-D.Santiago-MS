import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService} from "../../../utils/services/auth.service";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {replaceTsWithNgInErrors} from "@angular/compiler-cli/src/ngtsc/diagnostics";
import {CommonModule, NgIf} from "@angular/common";
import {computeMsgId} from "@angular/compiler";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    RouterLink,
    UserMenuComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('out => in', [
        animate('300ms ease-in')
      ]),
      transition('in => out', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @ViewChild('userMenu') userMenu: ElementRef | undefined;

  isAdmin: boolean = false;
  user = JSON.parse(localStorage.getItem('user') || '{}');
  isMenuOpen: boolean = false;
  protected readonly localStorage = localStorage;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    if (localStorage.getItem('user')) {
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

  get menuState() {
    return this.isMenuOpen ? 'in' : 'out';
  }
}

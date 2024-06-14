import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService} from "../../../utils/services/auth.service";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {ConfigService} from "../../../utils/services/config.service";
import {LoginComponent} from "../login/login.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgbAccordionBody, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    RouterLink,
    UserMenuComponent,
    CommonModule,
    MatDialogModule
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
  public isMenuOpen: boolean = false;
  protected readonly localStorage = localStorage;
  apiUrl: string;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private modalSrv: NgbModal
  ) {
    this.apiUrl = configService.getApiUrl()
  }
  async ngOnInit() {
    if (localStorage.getItem('user')) {
      this.isAdmin = await this.authService.isAdmin();
    }
    console.log(this.apiUrl)
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

  login(){
    this.modalSrv.open(LoginComponent, {
      centered: true,
      size: 'md'
    })
  }

  register(){
    this.modalSrv.open(RegisterComponent, {
      centered: true,
      size: 'md'
    })
  }
}

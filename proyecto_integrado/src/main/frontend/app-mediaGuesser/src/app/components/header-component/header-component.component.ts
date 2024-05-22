import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserTypeService} from "../../../utils/services/userType.service";
import {AuthService} from "../../../utils/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent implements OnInit {

  isAdmin : boolean = false
  user = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private authService : AuthService) {
  }
  async ngOnInit() {
    if(localStorage.getItem('user'))
    this.isAdmin = await this.authService.isAdmin()
    console.log(this.authService.isAdmin())
  }

  protected readonly localStorage = localStorage;
}

import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {NgIf} from "@angular/common";
import {WelcomeComponent} from "./components/welcome/welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent, NgIf, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  showWelcome = false;

  ngOnInit() {
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (!welcomeShown) {
      this.showWelcome = true;
    }
  }

  constructor() {
  }

}

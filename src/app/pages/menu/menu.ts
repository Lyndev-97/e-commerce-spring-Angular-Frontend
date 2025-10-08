import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {

   @Input() page!: string; 
    isMenuOpen: boolean = false; 

  constructor(private router: Router, public auth: AuthService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.auth.logout();
  }

}

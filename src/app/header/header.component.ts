import {Component, HostListener} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isHomePage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(
      value => {
        if (value instanceof NavigationEnd) {
          this.isHomePage = (value.url === "/home" || value.url === "/");
        }
      })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > element.clientHeight) {
      element.classList.add('navbar-scroll');
    } else {
      element.classList.remove('navbar-scroll');
    }
  }
}

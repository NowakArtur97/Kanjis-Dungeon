import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  private readonly MAIN_PAGE_URL = '/';

  isOnMainPage: boolean;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.isOnMainPage = event.url === this.MAIN_PAGE_URL;
      }
    });
  }

  ngOnInit(): void {}
}

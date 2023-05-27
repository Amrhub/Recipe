import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activePage = 'recipes';

  navigationChanged(page: string) {
    this.activePage = page;
  }
}

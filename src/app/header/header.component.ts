import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed = true;
  activeLink = 'recipes';
  @Output() navigationChanged = new EventEmitter<'recipes' | 'shopping-list'>();

  onNavigationChanged(page: 'recipes' | 'shopping-list') {
    this.activeLink = page;
    this.navigationChanged.emit(page);
  }
}

import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective],
  exports: [AlertComponent, LoadingSpinnerComponent, CommonModule, DropdownDirective],
})
export class SharedModule {}

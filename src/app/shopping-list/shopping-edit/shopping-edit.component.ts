import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(public shoppingListService: ShoppingListService) {}
  @ViewChild('form') form: NgForm;

  editMode = false;
  editingIngredient$: Subscription;

  ngOnInit(): void {
    this.editingIngredient$ = this.shoppingListService.startedEditing$.subscribe((index) => {
      if (index === null) return (this.editMode = false);
      this.editMode = true;

      const ingredient = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
    });
  }

  onSubmit(form: NgForm) {
    const { name, amount } = form.value;
    if (this.editMode) {
      const editingIndex = this.shoppingListService.startedEditingIndex;

      this.shoppingListService.updateIngredient(editingIndex, new Ingredient(name, amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
    this.shoppingListService.startedEditingIndex = null;
    form.reset();
  }

  onClear() {
    this.shoppingListService.startedEditingIndex = null;
    this.form.reset();
  }

  onDelete() {
    const index = this.shoppingListService.startedEditingIndex;
    this.shoppingListService.deleteIngredient(index);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editingIngredient$.unsubscribe();
  }
}

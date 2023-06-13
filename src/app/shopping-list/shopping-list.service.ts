import { Injectable, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService implements OnDestroy {
  private startedEditing = new BehaviorSubject<number>(null);
  startedEditing$ = this.startedEditing.pipe(shareReplay(1));

  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]);

  ingredients$ = this.ingredientsSubject.pipe(
    shareReplay(1) // This is to avoid multiple subscriptions to the same observable
  );

  constructor() {}

  ngOnDestroy() {
    this.ingredientsSubject.complete();
  }

  addIngredient(newIngredient: Ingredient) {
    const ingredient = this.ingredientsSubject
      .getValue()
      .find((i) => i.name === newIngredient.name);
    if (ingredient) {
      ingredient.amount += newIngredient.amount;
    } else {
      this.ingredientsSubject.next([...this.ingredientsSubject.value, newIngredient]);
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }

  getIngredient(index: number) {
    return this.ingredientsSubject.getValue()[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    const ingredients = this.ingredientsSubject.value;
    ingredients[index] = newIngredient;
    this.ingredientsSubject.next(ingredients);
  }

  deleteIngredient(index: number) {
    const ingredients = this.ingredientsSubject.value;
    ingredients.splice(index, 1);
    this.ingredientsSubject.next(ingredients);
  }

  set startedEditingIndex(index: number | null) {
    this.startedEditing.next(index);
  }

  get startedEditingIndex() {
    return this.startedEditing.getValue();
  }
}

import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]);

  ingredients$ = this.ingredientsSubject.pipe(
    shareReplay(1) // This is to avoid multiple subscriptions to the same observable
  );

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this.ingredientsSubject.next([...this.ingredientsSubject.value, ingredient]);
  }
}

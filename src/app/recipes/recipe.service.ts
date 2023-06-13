import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnDestroy {
  constructor() {}

  private recipesSubject = new BehaviorSubject<Recipe[]>([
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ]);

  recipes$ = this.recipesSubject.pipe(
    shareReplay(1), // This is to avoid multiple subscriptions to the same observable
    map((recipes) => recipes.slice()) // to avoid mutating the original array
  );

  ngOnDestroy() {
    this.recipesSubject.complete();
  }

  addRecipe(recipe: Recipe) {
    this.recipesSubject.next([...this.recipesSubject.value, recipe]);
  }

  getRecipe(index: number) {
    return this.recipesSubject.value[index];
  }

  updateRecipe(index: number, recipe: Recipe) {
    const recipes = [...this.recipesSubject.value];
    recipes[index] = recipe;
    this.recipesSubject.next(recipes);
  }

  deleteRecipe(index: number) {
    if (index === 0 && this.recipesSubject.value.length === 1) {
      return this.recipesSubject.next([]);
    }

    this.recipesSubject.value.splice(index, 1);
    this.recipesSubject.next(this.recipesSubject.value);
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnDestroy {
  constructor() {}

  private recipesSubject = new BehaviorSubject<Recipe[]>([]);

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

  setRecipes(recipes: Recipe[]) {
    this.recipesSubject.next(recipes);
  }

  getRecipe(index: number) {
    return this.recipesSubject.value[index];
  }

  getRecipes() {
    return this.recipesSubject.value.slice();
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

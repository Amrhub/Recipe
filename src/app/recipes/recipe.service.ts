import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnDestroy {
  constructor() {}

  private recipesSubject = new BehaviorSubject<Recipe[]>([
    new Recipe(
      'Test Recipe 1',
      'This is simply a Test 1',
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Chicken-Tikka-99647a6.jpg?quality=90&resize=556,505'
    ),
    new Recipe(
      'Test Recipe 2',
      'This is simply a Test 2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Chicken-Tikka-99647a6.jpg?quality=90&resize=556,505'
    ),
  ]);

  recipes$ = this.recipesSubject.pipe(
    shareReplay(1), // This is to avoid multiple subscriptions to the same observable
    map((recipes) => [...recipes])
  );

  private selectedRecipeSubject = new Subject<Recipe>();
  selectedRecipe$ = this.selectedRecipeSubject.pipe(
    shareReplay(1),
    map((recipe) => ({ ...recipe }))
  );

  ngOnDestroy() {
    this.recipesSubject.complete();
    this.selectedRecipeSubject.complete();
  }

  addRecipe(recipe: Recipe) {
    this.recipesSubject.next([...this.recipesSubject.value, recipe]);
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
}

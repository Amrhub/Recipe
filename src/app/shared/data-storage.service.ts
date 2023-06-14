import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-389f9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    console.log('fetchRecipes');
    const req$ = this.http
      .get<Recipe[]>(
        'https://recipe-389f9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => recipes.map((recipe) => ({ ingredients: [], ...recipe }))),
        tap((recipes) => {
          console.log(
            `🚀 ~ file: data-storage.service.ts:34 ~ DataStorageService ~ tap ~ recipes:`,
            recipes
          );
          this.recipeService.setRecipes(recipes);
        })
      );
    req$.subscribe();
    return req$;
  }
}

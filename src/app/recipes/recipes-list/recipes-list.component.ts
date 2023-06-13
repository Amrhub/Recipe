import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  recipes$ = this.recipeService.recipes$;
  // recipeNames$: Observable<string[] | undefined>;

  ngOnInit(): void {
    this.recipes$.pipe(map((recipes, _index) => recipes.map((recipe) => recipe.name))).subscribe(
      (recipeNames) => {
        console.log(recipeNames);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Completed!');
      }
    );
    setTimeout(() => {
      this.recipeService.addRecipe(
        new Recipe(
          'Test Recipe 3',
          'This is simply a Test 3',
          'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Chicken-Tikka-99647a6.jpg?quality=90&resize=556,505'
        )
      );
    }, 2000);
  }
}

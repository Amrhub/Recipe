import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  recipe: Recipe;
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

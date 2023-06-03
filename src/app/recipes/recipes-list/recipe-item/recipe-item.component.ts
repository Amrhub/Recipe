import { RecipeService } from './../../recipe.service';
import { Output, Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  @Input() recipe: Recipe;

  ngOnInit(): void {}

  onRecipeSelection(recipe: Recipe) {
    this.recipeService.selectRecipe(recipe);
  }
}

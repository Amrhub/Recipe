import { RecipeService } from './../../recipe.service';
import { Output, Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  constructor() {}

  @Input() recipe: Recipe;
  @Input() id: number;

  ngOnInit(): void {}
}

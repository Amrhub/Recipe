import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}
  ingredients$ = this.shoppingListService.ingredients$;

  ngOnInit(): void {}

  onEditItem(index: number) {
    this.shoppingListService.startedEditingIndex = index;
  }
}

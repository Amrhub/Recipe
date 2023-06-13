import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  isEditMode = false;
  id: number;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = +params.id;
      this.isEditMode = params.id != null;
      this.initForm();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let recipeName = '';
    let imageURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      if (recipe) {
        recipeName = recipe.name;
        imageURL = recipe.imageURL;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              this.initIngredientFormGroup(ingredient.name, ingredient.amount)
            );
          }
        }
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required, Validators.minLength(3)]),
      imageURL: new FormControl(imageURL, [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[^ "]+$/),
      ]),
      description: new FormControl(recipeDescription, [
        Validators.required,
        Validators.minLength(10),
      ]),
      ingredients: recipeIngredients,
    });
  }

  initIngredientFormGroup(name?: string, amount?: number) {
    return new FormGroup({
      name: new FormControl(name ?? '', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl(amount, [Validators.required, Validators.min(1)]),
    });
  }

  addIngredientFormGroup(name?: string, amount?: number) {
    this.recipeIngredientsCtrl.push(this.initIngredientFormGroup(name, amount));
  }

  onSubmit() {
    if (this.isEditMode) this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else this.recipeService.addRecipe(this.recipeForm.value);
    this.navigateBack();
  }

  deleteIngredient(index: number) {
    this.recipeIngredientsCtrl.removeAt(index);
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get recipeIngredientsCtrl() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get imageURLCtrl() {
    return this.recipeForm.get('imageURL');
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DishService} from "../dish.service";

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  cuisines: string[] = [
    'Italian',
    'Asian',
    'French',
    'Indian',
    'Intercontinental',
    'Polish',
    'Greek'
  ]
  categories: string[] = [
    'Main Dish',
    'Breakfast',
    'Salad',
    'Supper',
    'Lunch',
    'Starter'
  ]
  types: string[] = [
    'Meat',
    'Vegetarian',
    'Vegan',
  ]

  currencies: string[] = [
    '$',
    '€'
  ]
  dishForm: FormGroup;

  constructor(private dishService: DishService) {
  }
  ngOnInit(): void {
    this.initForm();
    console.log(this.dishForm);
  }

  onSubmit() {
    let newDish = this.dishForm.value;
    this.dishService.addDish(newDish);
  }

  private initForm() {
    let dishName = '';
    let cuisine = '';
    let type = '';
    let category = '';
    let quantity = 1;
    let price = 1;
    let currency = '';
    let description = '';
    let ingredients = new FormArray([]);
    let imagePaths = new FormArray([]);

    this.dishForm = new FormGroup({
      'name': new FormControl(dishName, Validators.required),
      'cuisine': new FormControl(cuisine, Validators.required),
      'type': new FormControl(type, Validators.required),
      'category': new FormControl(category, Validators.required),
      'quantity': new FormControl(quantity, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'price': new FormControl(price, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'currency': new FormControl(currency, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients,
      'imagePaths': imagePaths
    })
  }

  get ingredientsControls() {
    return (<FormArray>this.dishForm.get('ingredients')).controls;
  }

  get imagesControls() {
    return (<FormArray>this.dishForm.get('imagePaths')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.dishForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.dishForm.get('ingredients')).removeAt(index);
  }

  onAddImage() {
    (<FormArray>this.dishForm.get('imagePaths')).push(
      new FormGroup({
        'imagePath': new FormControl(null, Validators.required),
      })
    )
  }

  onDeleteImage(index: number) {
    (<FormArray>this.dishForm.get('imagePaths')).removeAt(index);
  }
}

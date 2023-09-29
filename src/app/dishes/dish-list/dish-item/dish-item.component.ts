import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../../dish.model";
import {DishService} from "../../dish.service";

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {
  @Input() dish: Dish;
  @Output() reservedDishesNumberChanged = new EventEmitter<number>();
  maxDishAmount: number;
  reservedDishesAmount = 0;
  dangerousDishAmount = 3;
  mostExpensive: Dish;
  cheapest: Dish;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.maxDishAmount = this.dish.amount;
    this.mostExpensive = this.dishService.getMostExpensiveDish();
    this.cheapest = this.dishService.getCheapestDish();
  }

  onAddDish() {
    if (this.dish.amount > 0) {
      this.reservedDishesAmount += 1;
      this.dish.amount -= 1;
      this.reservedDishesNumberChanged.emit(1);
    }
  }

  onSubtractDish() {
    if (this.dish.amount < this.maxDishAmount) {
      this.reservedDishesAmount -= 1;
      this.dish.amount += 1;
      this.reservedDishesNumberChanged.emit(-1);
    }
  }
}

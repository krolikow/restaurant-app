import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  totalReserved = 0;
  subscription: Subscription;
  dishes: Dish[]

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.subscription = this.dishService.dishesChanged.subscribe(
      (recipes: Dish[]) => {
        this.dishes = recipes;
      }
    )
    this.dishes = this.dishService.getDishes();

  }
  onReservedDishesChanged(factor: number) {
    this.totalReserved += factor;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

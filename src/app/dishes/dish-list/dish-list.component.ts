import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {Subscription} from "rxjs";
import {CurrencyService} from "../../currency.service";


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  totalReserved = 0;
  subscription: Subscription;
  dishes: Dish[];
  cheapest: number;
  mostExpensive: number;
  currencies = ['$', '€']
  selectedCurrency: string = '$';
  fields = {}

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.subscription = this.dishService.dishesChanged.subscribe(
      (dishes: Dish[]) => {
        this.dishes = dishes;
        this.cheapest = this.dishService.getCheapestDish().price;
        this.mostExpensive = this.dishService.getMostExpensiveDish().price;
        console.log(this.dishes);
      }
    )
  }

  onReservedDishesChanged(factor: number) {
    this.totalReserved += factor;
  }

  updateFilters($event: any) {
    this.fields = $event;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

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
  display = false;
  currencies = ['$', '€']
  selectedCurrency : string;
  fields = {}

  constructor(private dishService: DishService,
              private currencyService: CurrencyService) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onAddDish() {
    this.display = !this.display;
  }

  updateFilters($event: any) {
    this.fields = $event;
  }

  onCurrencyChange() {
    this.dishes = this.currencyService.transformCurrencies(this.dishes,this.selectedCurrency);
  }
}

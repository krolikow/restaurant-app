import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {Subscription} from "rxjs";
import {CurrencyService} from "../../currency.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";


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

  constructor(private dishService: DishService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.dishService.dishesChanged.subscribe(
      (dishes: Dish[]) => {
        this.dishes = dishes;
        this.cheapest = this.dishService.getCheapestDish().price;
        this.mostExpensive = this.dishService.getMostExpensiveDish().price;
        this.totalReserved = this.cartService.getTotalReservedDishes();
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

  onMenuNavigate() {
    this.router.navigate(['../','cart'],{relativeTo: this.route})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

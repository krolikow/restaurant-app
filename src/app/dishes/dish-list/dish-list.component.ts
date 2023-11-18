import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {map, Subscription} from "rxjs";
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
  isLoading = false;
  fields = {}

  constructor(private dishService: DishService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.dishService.getDishes().subscribe(
      dishes => {
        this.dishes = dishes;
        this.cheapest = this.dishService.getCheapestDish(dishes).price;
        this.mostExpensive = this.dishService.getMostExpensiveDish(dishes).price;
        this.totalReserved = this.cartService.getTotalReservedDishes();
        this.isLoading = false;
      });
  }


  onReservedDishesChanged(factor: number) {
    this.totalReserved += factor;
  }

  updateFilters($event: any) {
    this.fields = $event;
  }

  onMenuNavigate() {
    this.router.navigate(['../', 'cart'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

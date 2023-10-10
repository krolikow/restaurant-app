import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";
import {DishService} from "../dishes/dish.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartDishes: Map<Dish, number> = new Map();
  currencies = ['$', '€']
  selectedCurrency: string = '$';
  subscription: Subscription;
  total: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.subscription = this.cartService.cartChanged.subscribe((cart: Map<Dish, number>) => {
      this.cartDishes = cart;
      this.total = this.calculateTotal();
    })
    this.cartDishes = this.cartService.getCart();
    this.total = this.calculateTotal();
    console.log(this.cartDishes);
  }


  calculateTotal(){
    return this.cartService.calculateTotal(this.selectedCurrency);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectedCurrencyChanged() {
    this.total = this.calculateTotal();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartDishesMap: Map<string, number> = new Map();
  cartDishes: Dish[] = [];
  currencies = ['$', '€']
  selectedCurrency: string = '$';
  total: number;
  subscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartDishes = this.cartService.getCart();
    this.cartDishesMap = this.cartService.getCartDishesMap();
    this.total = this.calculateTotal();

    this.subscription = this.cartService.cartChanged.subscribe(
      cart => {
        this.cartDishesMap = cart;
        this.cartDishes = this.cartService.getCart();
        this.total = this.calculateTotal();
      }
    )
    console.log('cart dishes: ', this.cartDishes, this.cartDishesMap);
  }

  calculateTotal() {
    return this.cartService.calculateTotal(this.selectedCurrency);
  }

  onSelectedCurrencyChanged() {
    this.total = this.calculateTotal();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

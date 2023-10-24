import {Injectable} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {BehaviorSubject} from "rxjs";
import {CurrencyService} from "../currency.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Map<Dish, number> = new Map();
  cartChanged = new BehaviorSubject<Map<Dish, number>>(new Map());

  constructor(private currencyService: CurrencyService) {
  }

  addDish(dish: Dish) {
    if (this.cart.has(dish)) {
      const dishQuantity = this.cart.get(dish);
      this.cart.set(dish, dishQuantity + 1)
    } else {
      this.cart.set(dish, 1);
    }
    console.log('cart: ', this.cart);
    this.cartChanged.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  subtractDish(dish: Dish) {
    if (this.cart.has(dish)) {
      const dishQuantity = this.cart.get(dish);
      if(dishQuantity-1 === 0){
        this.cart.delete(dish)
      }
      else{
        this.cart.set(dish, dishQuantity - 1)
      }
    }
    console.log('cart: ', this.cart);
    this.cartChanged.next(this.cart);
  }

  getReservedDishes(dish: Dish) {
    if (this.cart.has(dish)) {
      return this.cart.get(dish);
    }
    return 0;
  }

  setReservedDishes(dish: Dish, quantity: number) {
    this.cart.set(dish, quantity);
    this.cartChanged.next(this.cart);
  }

  calculateTotal(currency: string) {
    return [...this.cart.entries()].map(([key, value]) =>
      this.currencyService.calculatePrice(key, currency) * value).reduce((prev, curr) => prev + curr,0)
  }
}

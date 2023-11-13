import {Injectable} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {BehaviorSubject} from "rxjs";
import {CurrencyService} from "../currency.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartMap: Map<string, number> = new Map();
  cart: Dish[] = [];
  cartChanged = new BehaviorSubject<Map<string, number>>(new Map());

  constructor(private currencyService: CurrencyService) {
  }

  addDish(dish: Dish) {
    if (this.cartMap.has(dish.id)) {
      const dishQuantity = this.cartMap.get(dish.id);
      this.cartMap.set(dish.id, dishQuantity + 1)
    } else {
      this.cartMap.set(dish.id, 1);
      this.cart.push(dish);
    }
    console.log('cart: ', this.cartMap);
    this.cartChanged.next(this.cartMap);
  }

  getCart() {
    return this.cart;
  }

  getCartDishesMap() {
    return this.cartMap;
  }

  subtractDish(dish: Dish) {
    if (this.cartMap.has(dish.id)) {
      const dishQuantity = this.cartMap.get(dish.id);
      if (dishQuantity - 1 === 0) {
        this.cartMap.delete(dish.id)
        this.cart = this.cart.filter(cartDish => cartDish.id !== dish.id);
      } else {
        this.cartMap.set(dish.id, dishQuantity - 1);
      }
    }
    console.log('cart: ', this.cart, this.cartMap);
    this.cartChanged.next(this.cartMap);
  }

  getReservedDishes(dish: Dish) {
    if (this.cartMap.has(dish.id)) {
      return this.cartMap.get(dish.id);
    }
    return 0;
  }

  setReservedDishes(id: string, quantity: number) {
    if(quantity === 0){
      this.cartMap.delete(id);
      this.cart = this.cart.filter(dish => dish.id !== id);
      this.cartChanged.next(this.cartMap);
      return;
    }
    this.cartMap.set(id, quantity);
    this.cartChanged.next(this.cartMap);
  }

  calculateTotal(currency: string) {
    return this.cart.map(dish =>
      this.currencyService.calculatePrice(dish, currency) * this.cartMap.get(dish.id)).reduce((prev, curr) => prev + curr, 0)
  }

  getTotalReservedDishes() {
    let total = 0
    Array.from(this.cartMap.values()).forEach((value) => {
      total += value;
    })
    return total;
  }
}

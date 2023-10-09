import {Injectable} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: Map<Dish, number> = new Map();
    cartChanged = new BehaviorSubject<Map<Dish, number>>(new Map());

    constructor() {
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
            this.cart.set(dish, dishQuantity - 1)
        } else {
            this.cart.set(dish, 0);
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
}

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
    cartDishes: Map<Dish, number> = new Map();
    subscription: Subscription;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.subscription = this.cartService.cartChanged.subscribe((cart: Map<Dish, number>) => {
            this.cartDishes = cart;
        })
        this.cartDishes = this.cartService.getCart();
        console.log(this.cartDishes);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {CartService} from "../cart/cart.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
    @Input() dish: Dish;
    @Input() quantity: number;
    @Output() reservedDishesNumberChanged = new EventEmitter<number>()
    reservedDishesAmount: number;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.reservedDishesAmount = this.cartService.getReservedDishes(this.dish);
    }

    onAddDish() {
        if (this.reservedDishesAmount < this.dish.maxDishAmount) {
            this.reservedDishesAmount += 1;
            this.reservedDishesNumberChanged.emit(1);
            this.cartService.addDish(this.dish);
        }
    }

    onSubtractDish() {
        if (this.reservedDishesAmount > 0) {
            this.reservedDishesAmount -= 1;
            this.reservedDishesNumberChanged.emit(-1);
            this.cartService.subtractDish(this.dish);
        }
    }
}

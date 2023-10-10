import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Dish} from "../dishes/dish.model";
import {CartService} from "../cart/cart.service";
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() dish: Dish;
  @Input() quantity: number;
  @Input() selectedCurrency: string;
  @Output() reservedDishesNumberChanged = new EventEmitter<number>()
  reservedDishesAmount: number;
  newPrice: number;

  constructor(private cartService: CartService,
              private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.reservedDishesAmount = this.cartService.getReservedDishes(this.dish);
    this.newPrice = this.currencyService.transformCurrency(this.dish, this.selectedCurrency);
  }

  ngOnChanges() {
    this.newPrice = this.currencyService.transformCurrency(this.dish, this.selectedCurrency);
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

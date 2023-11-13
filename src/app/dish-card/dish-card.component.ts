import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {forkJoin, Subscription, switchMap} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Dish} from "../dishes/dish.model";
import {DishService} from "../dishes/dish.service";
import {ReviewService} from "../reviews/review.service";
import {CartService} from "../cart/cart.service";
import {CurrencyService} from "../currency.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-dish-card',
    templateUrl: './dish-card.component.html',
    styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit, OnDestroy, OnChanges {
    @Input() menuMode: boolean;
    @Input() dishId!: string;
    @Input() selectedCurrency: string;
    @Output() reservedDishesNumberChanged = new EventEmitter<number>()
    @Input() mostExpensive!: number;
    @Input() cheapest!: number;
    reservedDishesAmount = 0;
    dangerousDishAmount = 3;
    subscription!: Subscription;
    rate: number = 0;
    calculatedPrice: number;
    dish: Dish;
    @ViewChild('addReviewModal') public addReviewModal: ModalDirective;
    @ViewChild('reviewsModal') public reviewsModal: ModalDirective;

    constructor(private dishService: DishService,
                private cartService: CartService,
                private currencyService: CurrencyService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.subscription = this.dishService.getDish(this.dishId).subscribe((dish: Dish) => {
            this.dish = dish;
            this.rate = this.dishService.calculateRate(this.dish);
            this.reservedDishesAmount = this.cartService.getReservedDishes(this.dish);
            this.calculatedPrice = this.currencyService.calculatePrice(this.dish, this.selectedCurrency);
            this.dish.rate = this.rate;
        })
    }

    onAddDish() {
        if (this.reservedDishesAmount < this.dish.quantity) {
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

    onDishDelete() {
        this.dishService.deleteDish(this.dish.id);
        this.reservedDishesNumberChanged.emit(this.reservedDishesAmount - 2 * this.reservedDishesAmount);
    }

    onDishDetailsNavigate() {
        if (!this.menuMode) return;
        this.router.navigate([this.dish.id], {
            relativeTo: this.route,
            queryParams: {currency: this.selectedCurrency}
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.dish) {
            if (changes['selectedCurrency']) {
                this.calculatedPrice = this.currencyService.calculatePrice(this.dish, this.selectedCurrency);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}



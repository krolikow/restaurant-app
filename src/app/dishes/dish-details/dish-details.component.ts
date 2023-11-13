import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DishService} from "../dish.service";
import {ReviewService} from "../../reviews/review.service";
import {CartService} from "../../cart/cart.service";
import {Dish} from "../dish.model";
import {ActivatedRoute, Params} from "@angular/router";
import {CurrencyService} from "../../currency.service";

@Component({
    selector: 'app-dish-details',
    templateUrl: './dish-details.component.html',
    styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
    dish: Dish;
    selectedCurrency: string;
    @Output() reservedDishesNumberChanged = new EventEmitter<number>()
    reservedDishesAmount = 0;
    dangerousDishAmount = 3;
    subscription!: Subscription;
    rate: number = 0;
    calculatedPrice: number;
    @ViewChild('addReviewModal') public addReviewModal: ModalDirective;
    @ViewChild('reviewsModal') public reviewsModal: ModalDirective;
    id: string;

    constructor(private dishService: DishService,
                private reviewService: ReviewService,
                private cartService: CartService,
                private currencyService: CurrencyService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(switchMap((params: Params) => {
                console.log(params)
                this.id = params['id'];
                return this.route.queryParams

            }), switchMap(queryParams => {
                this.selectedCurrency = queryParams['currency'];
                return this.dishService.getDish(this.id);
            })).subscribe(dish => {
            this.dish = dish;
            this.calculatedPrice = this.currencyService.calculatePrice(this.dish, this.selectedCurrency);
            this.dish.rate = this.dishService.calculateRate(this.dish)
            console.log('dish ', this.dish)
            });

        this.subscription = this.reviewService.reviewAdded.subscribe(
            () => {
                this.hideAddReview();
                if (this.reviewsModal) this.hideReviews();
            }
        )
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

    public showAddReview(): void {
        this.addReviewModal.show();
    }

    public hideAddReview(): void {
        this.addReviewModal.hide();
    }

    public showReviews(): void {
        this.reviewsModal.show();
    }

    public hideReviews(): void {
        this.reviewsModal.hide();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}



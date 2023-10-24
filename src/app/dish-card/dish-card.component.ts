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
import {Subscription} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Dish} from "../dishes/dish.model";
import {DishService} from "../dishes/dish.service";
import {ReviewService} from "../reviews/review.service";
import {CartService} from "../cart/cart.service";
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit, OnDestroy, OnChanges{
  @Input() menuMode: boolean;
  @Input() dish!: Dish;
  @Input() selectedCurrency: string;
  @Input() quantity: number;
  @Output() reservedDishesNumberChanged = new EventEmitter<number>()
  mostExpensive!: Dish;
  cheapest!: Dish;
  reservedDishesAmount = 0;
  dangerousDishAmount = 3;
  subscription!: Subscription;
  rate: number = 0;
  calculatedPrice: number;
  @ViewChild('addReviewModal') public addReviewModal: ModalDirective;
  @ViewChild('reviewsModal') public reviewsModal: ModalDirective;

  constructor(private dishService: DishService,
              private reviewService: ReviewService,
              private cartService: CartService,
              private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    console.log(this.menuMode)
    this.mostExpensive = this.dishService.getMostExpensiveDish();
    this.cheapest = this.dishService.getCheapestDish();
    this.rate = this.dishService.calculateRate(this.dish);
    this.dish.rate = this.rate;
    this.reservedDishesAmount = this.cartService.getReservedDishes(this.dish);

    this.subscription = this.dishService.dishesChanged.subscribe(
      () => {
        this.mostExpensive = this.dishService.getMostExpensiveDish();
        this.cheapest = this.dishService.getCheapestDish();
      }
    )

    this.subscription = this.dishService.reviewsChanged.subscribe(() => {
      this.rate = this.dishService.calculateRate(this.dish);
      this.dish.rate = this.rate;
    })

    this.subscription = this.reviewService.reviewAdded.subscribe(
      () => {
        this.hideAddReview();
        if (this.reviewsModal) this.hideReviews();
      }
    )
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

  onDishDelete() {
    this.dishService.deleteDish(this.dish);
    this.reservedDishesNumberChanged.emit(this.reservedDishesAmount - 2 * this.reservedDishesAmount);
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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedCurrency']){
      this.calculatedPrice = this.currencyService.calculatePrice(this.dish, this.selectedCurrency)
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DishService} from "../dish.service";
import {ReviewService} from "../../reviews/review.service";
import {CartService} from "../../cart/cart.service";
import {Dish} from "../dish.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, OnDestroy{
  @Input() dish!: Dish;
  @Input() selectedCurrency: string;
  @Output() reservedDishesNumberChanged = new EventEmitter<number>()
  reservedDishesAmount = 0;
  dangerousDishAmount = 3;
  subscription!: Subscription;
  rate: number = 0;
  @ViewChild('addReviewModal') public addReviewModal: ModalDirective;
  @ViewChild('reviewsModal') public reviewsModal: ModalDirective;
  id: number;
  constructor(private dishService: DishService,
              private reviewService: ReviewService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.dish = this.dishService.getDish(this.id);
        }
      );

    this.rate = this.dishService.calculateRate(this.dish);
    this.dish.rate = this.rate;

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



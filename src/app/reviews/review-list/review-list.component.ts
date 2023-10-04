import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Dish, Review} from "../../dishes/dish.model";
import {Subscription} from "rxjs";
import {DishService} from "../../dishes/dish.service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input() dish: Dish;
  reviews: Review[];
  subscription: Subscription;

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.subscription = this.dishService.reviewsChanged.subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        console.log(this.reviews);
      }
    )
    this.reviews = this.dishService.getReviews(this.index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

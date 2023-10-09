import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Dish, Review} from "../../dishes/dish.model";
import {Subscription} from "rxjs";
import {DishService} from "../../dishes/dish.service";
import {ReviewService} from "../review.service";

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnDestroy {
    @Input() dish: Dish;
    reviews: Review[];
    subscription: Subscription;

    constructor(private dishService: DishService,
                private reviewService: ReviewService) {
    }

    ngOnInit(): void {
        this.subscription = this.dishService.reviewsChanged.subscribe(
            (reviews: Review[]) => {
                this.reviews = reviews;
            }
        )
        this.reviews = this.reviewService.getReviews(this.dish);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

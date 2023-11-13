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

    constructor(private dishService: DishService) {
    }

    ngOnInit(): void {
        this.subscription = this.dishService.getDish(this.dish.id).subscribe(
            (dish: Dish) => {
                this.reviews = dish.reviews;
            }
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

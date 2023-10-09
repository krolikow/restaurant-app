import {EventEmitter, Injectable} from '@angular/core';
import {DishService} from "../dishes/dish.service";
import {Dish, Review} from "../dishes/dish.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    reviewAdded = new EventEmitter<void>();

    constructor(private dishService: DishService) {
    }

    getReviews(dish: Dish) {
        return dish.reviews.slice();
    }

    addReview(review: Review, dish: Dish) {
        dish.reviews.push(review);
        this.dishService.reviewsChanged.next(dish.reviews);
    }
}

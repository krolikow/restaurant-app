import {EventEmitter, Injectable} from '@angular/core';
import {DishService} from "../dishes/dish.service";
import {Review} from "../dishes/dish.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    reviewAdded = new EventEmitter<void>();

    constructor(private dishService: DishService) {
    }

    getReviews(dishIndex: number) {
        return this.dishService.getDishes().at(dishIndex).reviews.slice();
    }

    addReview(review: Review, dishIndex: number) {
        let updatedDish = this.dishService.getDishes().at(dishIndex);
        updatedDish.reviews.push(review);
        this.dishService.reviewsChanged.next(updatedDish.reviews);
    }
}

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

    addReview(review: Review, dish: Dish) {
        dish.reviews.push(review);
        const rate = this.dishService.calculateRate(dish);
        dish = {...dish,rate};
        this.dishService.updateDish(dish.id,dish);
    }
}

import {Injectable} from '@angular/core';
import {Dish, Review} from "./dish.model";
import dishesData from './fake-data/dishes.json'
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private dishes: Dish[] = [];
    dishesChanged = new BehaviorSubject<Dish[]>([]);
    reviewsChanged = new BehaviorSubject<Review[]>([]);

    constructor() {
        this.dishes.push(...dishesData);
        this.setRates();
        this.dishesChanged.next(this.dishes.slice());
    }

    getDishes() {
        return this.dishes.slice();
    }

    getCheapestDish() {
        return this.getDishes().reduce((prev, curr) =>
            prev.price < curr.price ? prev : curr
        )
    }

    getMostExpensiveDish() {
        return this.getDishes().reduce((prev, curr) =>
            prev.price < curr.price ? curr : prev
        )
    }

    deleteDish(index: number) {
        this.dishes.splice(index, 1);
        this.dishesChanged.next(this.dishes.slice());
    }

    addDish(dish: Dish) {
        this.dishes.push(dish);
        this.dishesChanged.next(this.dishes.slice());
    }

    updateDish(index: number, dish: Dish) {
        this.dishes[index] = dish;
        this.dishesChanged.next(this.dishes.slice());
    }

    getReviews(dishIndex: number) {
        return this.getDishes().at(dishIndex).reviews.slice();
    }

    addReview(review: Review, dishIndex: number) {
        this.dishes.at(dishIndex).reviews.push(review);
        this.reviewsChanged.next(this.getReviews(dishIndex));
    }

    calculateRate(dish: Dish) {
        if (!dish.reviews) return 0;
        const sum = dish.reviews
            .map(review => review.stars)
            .reduce((prev, curr) => prev + curr, 0);
        const divider = dish.reviews.length;
        return divider != 0 ? sum / divider : 0;
    }

    private getDish(dishIndex: number) {
        return this.getDishes().at(dishIndex);
    }

    getCuisines() {
        return new Set(this.getDishes().map(dish => dish.cuisine));
    }

    getCategories() {
        return new Set(this.getDishes().map(dish => dish.category));
    }

    getRates() {
        return new Set(this.getDishes().map(dish => Math.trunc(dish.rate)
        ));
    }

    setRates() {
        this.dishes.map(dish => {
            dish.rate = this.calculateRate(dish)
        });
    }
}

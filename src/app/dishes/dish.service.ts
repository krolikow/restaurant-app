import {Injectable} from '@angular/core';
import {Dish, Review} from "./dish.model";
import dishesData from './fake-data/dishes.json'
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishes: Dish[] = [];
  dishesChanged = new Subject<Dish[]>();
  reviewsChanged = new Subject<Review[]>();

  constructor() {
    console.log(dishesData);
    this.dishes.push(...dishesData);
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
    console.log(this.dishes);
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
    console.log(this.getDishes());
    this.reviewsChanged.next(this.getReviews(dishIndex));
  }

  calculateReview(dishIndex: number) {
    const sum = this.getReviews(dishIndex)
      .map(review => review.stars)
      .reduce((prev, curr) => prev + curr, 0);
    const divider = this.getReviews(dishIndex).length;
    console.log(divider != 0 ? sum / divider : 0);
    return divider != 0 ? sum / divider : 0;
  }

  private getDish(dishIndex: number) {
    return this.getDishes().at(dishIndex);
  }
}

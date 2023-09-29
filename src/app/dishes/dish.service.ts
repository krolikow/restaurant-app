import {Injectable} from '@angular/core';
import {Dish} from "./dish.model";
import dishesData from './fake-data/dishes.json'

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishes: Dish[] = [];

  constructor() {
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
}

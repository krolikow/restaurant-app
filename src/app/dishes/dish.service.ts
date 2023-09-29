import {Injectable} from '@angular/core';
import {Dish} from "./dish.model";
import dishesData from './fake-data/dishes.json'
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishes: Dish[] = [];
  dishesChanged = new Subject<Dish[]>();

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

  deleteDish(index: number) {
    this.dishes.splice(index, 1);
    console.log(this.dishes);
    this.dishesChanged.next(this.dishes.slice());
  }
}

import {Component, OnInit, Output} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  totalReserved = 0;
  dishes: Dish[]

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }

  onReservedDishesChanged(factor: number) {
    this.totalReserved += factor;
  }
}

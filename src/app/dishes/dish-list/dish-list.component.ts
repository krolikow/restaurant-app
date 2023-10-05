import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-dish-list',
    templateUrl: './dish-list.component.html',
    styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
    totalReserved = 0;
    subscription: Subscription;
    dishes: Dish[];
    cheapest: number;
    mostExpensive: number;
    fields = {
        cuisine: '',
        category: '',
        rate: '',
        minPrice: '',
        maxPrice: ''
    };
    display = false;

    constructor(private dishService: DishService) {
    }

    ngOnInit(): void {
        this.subscription = this.dishService.dishesChanged.subscribe(
            (dishes: Dish[]) => {
                this.dishes = dishes;
                this.cheapest = this.dishService.getCheapestDish().price;
                this.mostExpensive = this.dishService.getMostExpensiveDish().price;
                this.fields.minPrice = String(this.cheapest);
                this.fields.maxPrice = String(this.mostExpensive);
                console.log(this.dishes);
            }
        )
        this.dishes = this.dishService.getDishes();
        this.cheapest = this.dishService.getCheapestDish().price;
        this.mostExpensive = this.dishService.getMostExpensiveDish().price;
        this.fields.minPrice = String(this.cheapest);
        this.fields.maxPrice = String(this.mostExpensive);
    }

    onReservedDishesChanged(factor: number) {
        this.totalReserved += factor;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    updateFilters() {
        Object.keys(this.fields).forEach(key => this.fields[key] === '' ? delete this.fields[key] : key);
        this.fields = Object.assign({}, this.fields);
    }

    onAddDish() {
        this.display = !this.display;
    }
}

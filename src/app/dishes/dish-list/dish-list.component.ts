import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../dish.model";
import {DishService} from "../dish.service";
import {Subscription} from "rxjs";
import {IDropdownSettings} from 'ng-multiselect-dropdown'

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
        cuisine: [],
        category: [],
        rate: [],
        minPrice: '',
        maxPrice: ''
    };
    display = false;
    cuisines = [];
    categories = [];
    rates = []
    cuisineDropdownSettings: IDropdownSettings = {};
    categoryDropdownSettings: IDropdownSettings = {};
    rateDropdownSettings: IDropdownSettings = {};

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
                this.setDropdowns();
                this.setDropdownSettings();
                console.log(this.dishes);
            }
        )
    }

    onReservedDishesChanged(factor: number) {
        this.totalReserved += factor;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    updateFilters(trigger: any) {
        Object.keys(this.fields).forEach(key => this.fields[key] === '' ? delete this.fields[key] : key);
        this.fields = Object.assign({}, this.fields);
    }

    onAddDish() {
        this.display = !this.display;
    }

    private setDropdowns() {
        this.cuisines = Array.from(this.dishService.getCuisines()).map((cuisine, id) =>
            ({'item_id': id, 'cuisine': cuisine})
        )
        this.categories = Array.from(this.dishService.getCategories()).map((category, id) =>
            ({'item_id': id, 'category': category})
        )
        this.rates = Array.from(this.dishService.getRates()).map((rate, id) =>
            ({'item_id': id, 'rate': rate})
        )
    }

    private setDropdownSettings() {
        this.cuisineDropdownSettings = {
            idField: 'item_id',
            textField: 'cuisine',
        };
        this.categoryDropdownSettings = {
            idField: 'item_id',
            textField: 'category',
        };
        this.rateDropdownSettings = {
            idField: 'item_id',
            textField: 'rate',
        };
    }
}

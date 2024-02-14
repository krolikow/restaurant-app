import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {Dish} from "../dishes/dish.model";
import {DishService} from "../dishes/dish.service";
import {Subscription} from "rxjs";


interface DropdownItem {
}

class DropdownCuisineItem implements DropdownItem {
    constructor(public item_id: number,
                public cuisine: string) {
    }
}

class DropdownCategoryItem implements DropdownItem {
    constructor(public item_id: number,
                public category: string) {
    }
}

class DropdownRateItem implements DropdownItem {
    constructor(public item_id: number,
                public rate: number) {
    }
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
    @Input() dishes: Dish[];
    @Input() cheapest: number;
    @Input() mostExpensive: number;
    @Output() updateFiltersEvent = new EventEmitter();
    fields = {
        cuisine: [],
        category: [],
        rate: [],
        minPrice: '',
        maxPrice: ''
    };
    cuisines = [];
    categories = [];
    rates = [];
    cuisineDropdownSettings: IDropdownSettings = {};
    categoryDropdownSettings: IDropdownSettings = {};
    rateDropdownSettings: IDropdownSettings = {};
    subscription: Subscription;

    constructor(private dishService: DishService) {
    }

    ngOnInit(): void {

        this.subscription = this.dishService.getDishes().subscribe(
            (dishes: Dish[]) => {
                this.dishes = dishes;
                this.fields.minPrice = String(this.cheapest);
                this.fields.maxPrice = String(this.mostExpensive);
                this.setDropdowns(this.dishService.getCuisines(this.dishes), this.dishService.getCategories(this.dishes), this.dishService.getRates(this.dishes));
                this.setDropdownSettings();
            }
        )
        console.log(this.fields)
    }

    updateFilters() {
        const filteredCuisines = this.dishes
            .filter(dish => this.fields.category.length !== 0 ? this.fields.category
                .map(item => item.category).includes(dish.category) : true)
            .filter(dish => this.fields.rate.length !== 0 ? this.fields.rate
                .map(item => item.rate).includes(dish.rate) : true)
            .map(dish => dish.cuisine);
        const filteredCuisinesSet = new Set(filteredCuisines);
        this.cuisines = this.setDropdown(filteredCuisinesSet, DropdownCuisineItem);

        const filteredCategories = this.dishes
            .filter(dish => this.fields.cuisine.length !== 0 ? this.fields.cuisine
                .map(item => item.cuisine).includes(dish.cuisine) : true)
            .filter(dish => this.fields.rate.length !== 0 ? this.fields.rate
                .map(item => item.rate).includes(dish.rate) : true)
            .map(dish => dish.category)
        const filteredCategoriesSet = new Set(filteredCategories);
        this.categories = this.setDropdown(filteredCategoriesSet, DropdownCategoryItem);


        const filteredRates = this.dishes
            .filter(dish => this.fields.category.length !== 0 ? this.fields.category
                .map(item => item.category).includes(dish.category) : true)
            .filter(dish => this.fields.cuisine.length !== 0 ? this.fields.cuisine
                .map(item => item.cuisine).includes(dish.cuisine) : true)
            .map(dish => Math.trunc(dish.rate));
        const filteredRatesSet = new Set(filteredRates);
        this.rates = this.setDropdown(filteredRatesSet, DropdownRateItem);

        Object.keys(this.fields).forEach(key => this.fields[key] === '' ? delete this.fields[key] : key);
        this.fields = Object.assign({}, this.fields);
        this.updateFiltersEvent.emit(this.fields);
    }

    private setDropdowns(cuisines: Iterable<string>, categories: Iterable<string>, rates: Iterable<number>) {
        this.cuisines = this.setDropdown(cuisines, DropdownCuisineItem);
        this.categories = this.setDropdown(categories, DropdownCategoryItem);
        this.rates = this.setDropdown(rates, DropdownRateItem);
    }

    private setDropdown<T extends DropdownItem>(arr: Iterable<any>, dropdownItem: { new(arg1: number, arg2: any): T }) {
        return Array.from(arr).map((item, id) => {
            return new dropdownItem(id, item);
        })
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

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

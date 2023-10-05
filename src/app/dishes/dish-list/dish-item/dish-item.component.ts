import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dish} from "../../dish.model";
import {Subscription} from "rxjs";
import {DishService} from "../../dish.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal"

@Component({
    selector: 'app-dish-item',
    templateUrl: './dish-item.component.html',
    styleUrls: ['./dish-item.component.css'],
    providers: [MdbModalService]
})
export class DishItemComponent implements OnInit, OnDestroy {
    @Input() dish!: Dish;
    @Input() index!: number;
    @Output() reservedDishesNumberChanged = new EventEmitter<number>()
    mostExpensive!: Dish;
    cheapest!: Dish;
    maxDishAmount!: number;
    reservedDishesAmount = 0;
    dangerousDishAmount = 3;
    subscription!: Subscription;
    rate: number = 0;

    constructor(private dishService: DishService) {
    }

    ngOnInit(): void {
        this.maxDishAmount = this.dish.amount;
        this.mostExpensive = this.dishService.getMostExpensiveDish();
        this.cheapest = this.dishService.getCheapestDish();
        this.rate = this.dishService.calculateRate(this.dish);
        this.dish.rate = this.rate;

        this.subscription = this.dishService.dishesChanged.subscribe(
            () => {
                this.mostExpensive = this.dishService.getMostExpensiveDish();
                this.cheapest = this.dishService.getCheapestDish();
            }
        )

        this.subscription = this.dishService.reviewsChanged.subscribe(() => {
            this.rate = this.dishService.calculateRate(this.dish);
            this.dish.rate = this.rate;
        })
    }

    onAddDish() {
        if (this.dish.amount > 0) {
            this.reservedDishesAmount += 1;
            this.dish.amount -= 1;
            this.reservedDishesNumberChanged.emit(1);
        }
    }

    onSubtractDish() {
        if (this.dish.amount < this.maxDishAmount) {
            this.reservedDishesAmount -= 1;
            this.dish.amount += 1;
            this.reservedDishesNumberChanged.emit(-1);
        }
    }

    onDishDelete() {
        this.dishService.deleteDish(this.index);
        this.reservedDishesNumberChanged.emit(this.reservedDishesAmount - 2 * this.reservedDishesAmount);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

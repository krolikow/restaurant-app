import {Injectable} from '@angular/core';
import {Dish, Review} from "./dish.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CartService} from "../cart/cart.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class DishService {
    dishesRef: any;
    private readonly dishes: Observable<any>;

    constructor(private readonly fireStoreService: AngularFirestore,
                private cartService: CartService) {
        this.dishesRef = fireStoreService.collection('DishData');
        this.dishes = this.dishesRef.valueChanges({idField: 'id'})
            .pipe(
                map((dishes: any[]) => {
                    return dishes.map(dish => {
                        const rate = this.calculateRate(dish);
                        return {...dish, rate}
                    })
                })
            );
    }

    getDishes(): Observable<Dish[]> {
        return this.dishes;
    }

    getDish(id: string): Observable<Dish> {
        return this.dishesRef.doc(id).valueChanges({idField: 'id'}) as Observable<Dish>;
    }

    getCheapestDish(dishes) {
        return dishes.reduce((prev: Dish, curr: Dish) =>
            prev.price < curr.price ? prev : curr
        );
    }

    getMostExpensiveDish(dishes) {
        return dishes.reduce((prev: Dish, curr: Dish) =>
            prev.price < curr.price ? curr : prev
        );
    }

    deleteDish(id: string) {
        this.dishesRef.doc(id).delete();
        this.cartService.setReservedDishes(id, 0);
        this.cartService.cartChanged.next(this.cartService.getCartDishesMap());
    }

    addDish(dish: Dish) {
        this.dishesRef.add(dish);
    }

    updateDish(id: string, dish: Dish) {
        console.log(dish)
        this.dishesRef.doc(id).update(dish);
    }


    calculateRate(dish: Dish) {
        if (!dish.reviews) return 0;
        const sum = dish.reviews
            .map(review => review.stars)
            .reduce((prev, curr) => prev + curr, 0);
        const divider = dish.reviews.length;
        return divider != 0 ? sum / divider : 0;
    }


    getCuisines(dishes: Dish[]) {
        if (!dishes) return new Set<string>();
        return new Set(dishes.map((dish: Dish) => dish.cuisine));
    }

    getCategories(dishes: Dish[]) {
        if (!dishes) return new Set<string>();
        return new Set(dishes.map((dish: Dish) => dish.category));
    }

    getRates(dishes: Dish[]) {
        if (!dishes) return new Set<number>();
        return new Set(dishes.map((dish: Dish) => {
            return Math.trunc(dish.rate);
        }));
    }
}

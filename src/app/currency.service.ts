import {Injectable} from '@angular/core';
import {Dish} from "./dishes/dish.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  transformCurrency(dish: Dish, currency: string) {
    if(dish.currency === currency || !currency) return dish.price;
    if (currency == '€') {
      return 0.75 * dish.price;
    } else if (currency == '$') {
      return 0.87 * dish.price;
    }
    return 1.1 * dish.price;
  }

  transformCurrencies(dishes: Dish[], currency: string) {
    return dishes.map(dish => {
        return ({...dish, price: this.transformCurrency(dish, currency)})
      }
    );
  }
}

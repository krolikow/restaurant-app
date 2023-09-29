import {Cuisine} from "../enums/cuisine.enums";
import {DishType} from "../enums/dish-type.enum";
import {Category} from "../enums/category.enum";

export class Dish {
  constructor(public name: string,
              public cuisine: string,
              public type: string,
              public category: string,
              public ingredients: string[],
              public amount: number,
              public price: number,
              public currency: string,
              public description: string,
              public image: string,
  ) {
  }
}

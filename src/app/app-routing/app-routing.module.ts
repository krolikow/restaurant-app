import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DishListComponent} from "../dishes/dish-list/dish-list.component";
import {CartComponent} from "../cart/cart.component";
import {DishFormComponent} from "../dishes/dish-form/dish-form.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'menu', component: DishListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'add-dish', component: DishFormComponent}]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DishListComponent} from "../dishes/dish-list/dish-list.component";
import {CartComponent} from "../cart/cart.component";
import {DishFormComponent} from "../dishes/dish-form/dish-form.component";
import {HomeComponent} from "../home/home.component";
import {DishDetailsComponent} from "../dishes/dish-details/dish-details.component";
import {MenuComponent} from "../menu/menu.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'menu', component: MenuComponent,
    children: [
      {path: '', component: DishListComponent, pathMatch:'full'},
      {path: ':id', component: DishDetailsComponent}]
  },
  {path: 'cart', component: CartComponent},
  {path: 'add-dish', component: DishFormComponent}]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

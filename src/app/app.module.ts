import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishItemComponent } from './dishes/dish-list/dish-item/dish-item.component';
import {MatCardModule} from "@angular/material/card";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishItemComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

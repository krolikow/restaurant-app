import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishItemComponent } from './dishes/dish-list/dish-item/dish-item.component';
import {MatCardModule} from "@angular/material/card";
import { HeaderComponent } from './header/header.component';
import { DishFormComponent } from './dishes/dish-form/dish-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishItemComponent,
    HeaderComponent,
    DishFormComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

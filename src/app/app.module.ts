import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DishListComponent} from './dishes/dish-list/dish-list.component';
import {DishItemComponent} from './dishes/dish-list/dish-item/dish-item.component';
import {MatCardModule} from "@angular/material/card";
import {HeaderComponent} from './header/header.component';
import {DishFormComponent} from './dishes/dish-form/dish-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReviewListComponent} from './reviews/review-list/review-list.component';
import {ReviewFormComponent} from "./reviews/review-form/review-form.component";
import {ReviewComponent} from "./reviews/review/review.component";
import {MdbModalService, MdbModalRef, MdbModalModule} from "mdb-angular-ui-kit/modal"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { FilterPipe } from './dishes/dish-list/filter.pipe';
import {RatingStarsComponent} from "./dishes/rating-stars/rating-stars.component";

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishItemComponent,
    HeaderComponent,
    DishFormComponent,
    ReviewFormComponent,
    ReviewComponent,
    ReviewListComponent,
    FilterComponent,
    FilterPipe,
    RatingStarsComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MdbModalModule,
    NgbModule,
    NgbRatingModule
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

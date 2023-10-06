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
import {MdbModalModule, MdbModalService} from "mdb-angular-ui-kit/modal"
import {NgbModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {FilterPipe} from './pipes/filter.pipe';
import {RatingStarsComponent} from "./utils/rating-stars/rating-stars.component";
import {MatSliderModule} from '@angular/material/slider';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FilterComponent} from './filter/filter.component'

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
        FilterPipe,
        RatingStarsComponent,
        FilterComponent
    ],
    imports: [
        BrowserModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MdbModalModule,
        NgbModule,
        NgbRatingModule,
        MatSliderModule,
        NgMultiSelectDropDownModule
    ],
    providers: [MdbModalService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DishListComponent} from './dishes/dish-list/dish-list.component';
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
import {ModalModule} from "ngx-bootstrap/modal";
import {CartComponent} from './cart/cart.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {DishCardComponent} from './dish-card/dish-card.component';
import {CommonModule} from "@angular/common";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {DishDetailsComponent} from "./dishes/dish-details/dish-details.component";
import {MenuComponent} from './menu/menu.component';
import {ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment.development";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";


@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    HeaderComponent,
    DishFormComponent,
    ReviewFormComponent,
    ReviewComponent,
    ReviewListComponent,
    FilterPipe,
    RatingStarsComponent,
    FilterComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    DishCardComponent,
    DishDetailsComponent,
    MenuComponent
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
    NgMultiSelectDropDownModule,
    ModalModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [MdbModalService, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

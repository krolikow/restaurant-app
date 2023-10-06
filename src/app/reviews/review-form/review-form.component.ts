import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish, Review} from "../../dishes/dish.model";
import {DishService} from "../../dishes/dish.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ReviewService} from "../review.service";

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    @Input() dish: Dish;
    @Input() index: number
    reviewForm: FormGroup;
    ratingValue = 0;
    ratingContent = '';

    constructor(private dishService: DishService,
                private reviewService: ReviewService) {
    }

    ngOnInit(): void {
        this.reviewForm = this.initForm();
    }

    initForm() {
        return new FormGroup({
            ratingValue: new FormControl(''),
            ratingContent: new FormControl('')
        })
    }

    onSubmit() {
        const newReview = new Review(
            this.reviewForm.value.ratingValue,
            this.reviewForm.value.ratingContent)
        console.log(newReview);
        this.dishService.addReview(newReview, this.index);
        this.reviewForm.reset();
        this.reviewService.reviewAdded.emit();
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {Dish, Review} from "../../dishes/dish.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReviewService} from "../review.service";

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    @Input() dish: Dish;
    reviewForm: FormGroup;
    ratingValue = 0;
    ratingContent = '';

    constructor(private reviewService: ReviewService) {
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
        this.reviewService.addReview(newReview, this.dish);
        this.reviewForm.reset();
        this.reviewService.reviewAdded.emit();
    }
}

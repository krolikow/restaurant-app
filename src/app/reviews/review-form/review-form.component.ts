import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Review} from "../../dishes/dish.model";
import {DishService} from "../../dishes/dish.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() dish;
  @Input() index;
  @ViewChild('reviewForm') reviewForm: NgForm;
  ratingValue = 0;
  ratingContent = '';

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const newReview = new Review(
      this.reviewForm.value.ratingValue,
      this.reviewForm.value.ratingContent)
    this.dishService.addReview(newReview, this.index);
    console.log(this.reviewForm)
    this.reviewForm.resetForm();
    this.reviewForm.reset();
    this.ratingValue = null;
    this.ratingContent = '';
    this.reviewForm.controls['ratingValue'].setValue(null);
    this.reviewForm.controls['ratingContent'].setValue(null);
    this.reviewForm.controls['ratingValue'].reset();
    this.reviewForm.controls['ratingContent'].reset();
    console.log(this.reviewForm);
    console.log(this.ratingValue, this.ratingContent);
  }

  onShow() {
    console.log(this.reviewForm)
  }
}

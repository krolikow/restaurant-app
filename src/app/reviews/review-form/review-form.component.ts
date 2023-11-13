import {Component, Input, OnInit} from '@angular/core';
import {Dish, Review} from "../../dishes/dish.model";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ReviewService} from "../review.service";
import moment from "moment";


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent implements OnInit {
  @Input() dish: Dish;
  reviewForm: FormGroup;
  nick = '';
  ratingValue = '';
  ratingContent = '';
  orderDate = '';
  maxDate = moment(new Date()).format('YYYY-MM-DD')

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.reviewForm = this.initForm();
    console.log(this.reviewForm);
  }

  initForm() {
    return new FormGroup({
      nick: new FormControl('', Validators.required),
      ratingValue: new FormControl('', [Validators.required]),
      ratingContent: new FormControl('', Validators.required),
      orderDate: new FormControl('', this.dateValidator())
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = moment();

      if (!(control && control.value)) {
        return null;
      }
      console.log(control.errors)
      return moment(control.value) > today
        ? {'invalidDate': true}
        : null;
    }
  }

  onSubmit() {
    const newReview = new Review(
      this.reviewForm.value.nick,
      this.reviewForm.value.ratingValue,
      this.reviewForm.value.ratingContent,
      this.reviewForm.value.orderDate)
    this.reviewService.addReview(Object.assign({},newReview), this.dish);
    this.reviewForm.reset();
    this.reviewService.reviewAdded.emit();
  }
}

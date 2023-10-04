import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../dishes/dish.model";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit{
  @Input() review: Review;

  ngOnInit(): void {
    console.log(this.review);
  }

}

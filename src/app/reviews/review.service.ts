import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewAdded = new EventEmitter<void>();
  constructor() { }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface IRatingUnit {
  value: number;
  active: boolean;
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit, OnChanges {

  constructor() {
  }

  @Input() max = 5;
  @Input() ratingValue = 5;
  @Input() showRatingValue = true;

  @Output()
  rateChange = new EventEmitter<number>();
  ratingUnits: Array<IRatingUnit> = [];


  ngOnChanges(changes: SimpleChanges) {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.caculate(max, this.ratingValue);
    }
  }

  ngOnInit() {
  }


  caculate(max, raitingValue) {
    this.ratingUnits = Array.from({length: max},
      (_, index) =>
        ({value: index + 1, active: index < raitingValue}));
  }

  select(index) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }

  enter(index) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }

  reset() {
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
  }
}

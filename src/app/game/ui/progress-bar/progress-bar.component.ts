import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() progress = 0;
  @Input() totalValue = 100;
  backgroundColor = 'green';

  constructor() {}

  ngOnInit(): void {
    if (this.progress > this.totalValue) {
      this.progress = 100;
      this.totalValue = 100;
    }

    this.progress = (this.progress / this.totalValue) * 100;
    if (this.progress <= 25) {
      this.backgroundColor = 'red';
    } else if (this.progress <= 50) {
      this.backgroundColor = 'yellow';
    } else {
      this.backgroundColor = 'green';
    }
  }

  getStyles(): { width: string; 'background-color': string } {
    return {
      width: `${this.progress}%`,
      'background-color': this.backgroundColor,
    };
  }
}

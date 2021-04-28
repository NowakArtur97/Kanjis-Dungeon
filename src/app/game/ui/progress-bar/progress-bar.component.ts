import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() currentValue: number;
  @Input() totalValue: number;
  @Input() private progress: number;
  backgroundColor = 'green';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.updateValues();
  }

  private updateValues(): void {
    if (!this.currentValue) {
      this.currentValue = 100;
    }
    if (!this.totalValue) {
      this.totalValue = 100;
    }

    this.progress = (this.currentValue / this.totalValue) * 100;
    this.setBackgroundColor();
  }

  private setBackgroundColor(): void {
    // TODO: ProgressBar: Move to some properties file / retrieve by Input?
    if (this.progress <= 25) {
      this.backgroundColor = 'hsl(0deg 100% 40%)';
    } else if (this.progress <= 50) {
      this.backgroundColor = 'hsl(60deg 100% 35%)';
    } else {
      this.backgroundColor = 'hsl(120deg 70% 40%)';
    }
  }

  getProgressStyles(): { width: string; 'background-color': string } {
    return {
      width: `${this.progress}%`,
      'background-color': this.backgroundColor,
    };
  }
}

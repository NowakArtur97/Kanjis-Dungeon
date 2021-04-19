import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() currentValue = 0;
  @Input() totalValue = 100;
  @Input() progress = 100;
  backgroundColor = 'green';

  constructor() {}

  ngOnInit(): void {
    this.progress = (this.currentValue / this.totalValue) * 100;
    this.setBackgroundColor();
  }

  ngOnChanges(): void {
    this.progress = (this.currentValue / this.totalValue) * 100;
    this.setBackgroundColor();
  }

  getStyles(): { width: string; 'background-color': string } {
    return {
      width: `${this.progress}%`,
      'background-color': this.backgroundColor,
    };
  }

  private setBackgroundColor() {
    if (this.progress <= 25) {
      this.backgroundColor = 'hsl(0deg 100% 40%)';
    } else if (this.progress <= 50) {
      this.backgroundColor = 'hsl(60deg 100% 35%)';
    } else {
      this.backgroundColor = 'hsl(120deg 70% 40%)';
    }
  }
}

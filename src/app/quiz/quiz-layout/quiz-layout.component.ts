import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-layout',
  templateUrl: './quiz-layout.component.html',
  styleUrls: ['./quiz-layout.component.css'],
})
export class QuizLayoutComponent implements OnInit {
  @Input() shouldDisplayOptions = true;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppStoreState from 'src/app/store/app.state';

@Component({
  selector: 'app-quiz-options',
  templateUrl: './quiz-options.component.html',
  styleUrls: ['./quiz-options.component.css'],
})
export class QuizOptionsComponent implements OnInit {
  quizOptionsFormGroup: FormGroup;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {}

  onChangeOptions(): void {}
}

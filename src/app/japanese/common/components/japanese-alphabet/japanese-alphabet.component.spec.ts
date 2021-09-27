import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseAlphabetComponent } from './japanese-alphabet.component';

describe('JapaneseAlphabetComponent', () => {
  let component: JapaneseAlphabetComponent;
  let fixture: ComponentFixture<JapaneseAlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JapaneseAlphabetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JapaneseAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

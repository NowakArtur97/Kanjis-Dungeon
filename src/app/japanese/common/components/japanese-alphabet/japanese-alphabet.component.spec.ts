import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JapaneseAlphabetComponent } from './japanese-alphabet.component';

describe('JapaneseAlphabetComponent', () => {
  let component: JapaneseAlphabetComponent;
  let fixture: ComponentFixture<JapaneseAlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JapaneseAlphabetComponent],
      imports: [BrowserAnimationsModule],
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

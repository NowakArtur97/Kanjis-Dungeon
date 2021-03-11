import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRadicalComponent } from './card-radical.component';

describe('CardRadicalComponent', () => {
  let component: CardRadicalComponent;
  let fixture: ComponentFixture<CardRadicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRadicalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRadicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

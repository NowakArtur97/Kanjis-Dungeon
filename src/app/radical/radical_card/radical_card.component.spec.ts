import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicalCardComponent } from './radical_card.component';

describe('RadicalCardComponent', () => {
  let component: RadicalCardComponent;
  let fixture: ComponentFixture<RadicalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadicalCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatusesComponent } from './character-statuses.component';

describe('CharacterStatusesComponent', () => {
  let component: CharacterStatusesComponent;
  let fixture: ComponentFixture<CharacterStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterStatusesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

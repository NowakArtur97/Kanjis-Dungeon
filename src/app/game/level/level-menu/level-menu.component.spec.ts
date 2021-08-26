import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelMenuComponent } from './level-menu.component';

describe('LevelMenuComponent', () => {
  let component: LevelMenuComponent;
  let fixture: ComponentFixture<LevelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

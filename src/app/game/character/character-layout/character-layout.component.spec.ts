import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLayoutComponent } from './character-layout.component';

describe('CharacterLayoutComponent', () => {
  let component: CharacterLayoutComponent;
  let fixture: ComponentFixture<CharacterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

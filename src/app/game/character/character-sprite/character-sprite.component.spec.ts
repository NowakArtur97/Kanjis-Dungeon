import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CharacterSpriteComponent } from './character-sprite.component';

describe('CharacterSpriteComponent', () => {
  let component: CharacterSpriteComponent;
  let fixture: ComponentFixture<CharacterSpriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterSpriteComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

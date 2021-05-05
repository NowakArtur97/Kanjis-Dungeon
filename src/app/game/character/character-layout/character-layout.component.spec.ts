import { ComponentFixture, TestBed } from '@angular/core/testing';
import MathUtil from 'src/app/common/utils/math.util';

import { CharacterLayoutComponent } from './character-layout.component';

describe('CharacterLayoutComponent', () => {
  let component: CharacterLayoutComponent;
  let fixture: ComponentFixture<CharacterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLayoutComponent);
    component = fixture.componentInstance;

    spyOn(MathUtil, 'getRandomIntValue').and.returnValue(0);

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should set random top offset', () => {
      expect(MathUtil.getRandomIntValue).toHaveBeenCalled();
    });
  });
});

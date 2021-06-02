import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import defaultPlayer from '../../player/player.data';
import { CharacterLayoutComponent } from './character-layout.component';

describe('CharacterLayoutComponent', () => {
  let component: CharacterLayoutComponent;
  let fixture: ComponentFixture<CharacterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterLayoutComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLayoutComponent);
    component = fixture.componentInstance;

    component.character = defaultPlayer;

    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('when initialize component', () => {
    it('should detect changes', () => {
      const changeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const detectChangesSpy = spyOn(
        changeDetectorRef.constructor.prototype,
        'detectChanges'
      );
      component.ngAfterViewInit();

      expect(detectChangesSpy).toHaveBeenCalled();
    });
  });
});

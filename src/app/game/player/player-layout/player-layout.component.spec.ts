import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { PlayerLayoutComponent } from './player-layout.component';

describe('PlayerLayoutComponent', () => {
  let component: PlayerLayoutComponent;
  let fixture: ComponentFixture<PlayerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerLayoutComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

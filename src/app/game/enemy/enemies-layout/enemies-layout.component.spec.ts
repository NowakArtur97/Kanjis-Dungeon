import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesLayoutComponent } from './enemies-layout.component';

describe('EnemiesLayoutComponent', () => {
  let component: EnemiesLayoutComponent;
  let fixture: ComponentFixture<EnemiesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemiesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

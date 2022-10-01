import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolverRequerimentComponent } from './solver-requeriment.component';

describe('SolverRequerimentComponent', () => {
  let component: SolverRequerimentComponent;
  let fixture: ComponentFixture<SolverRequerimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolverRequerimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolverRequerimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

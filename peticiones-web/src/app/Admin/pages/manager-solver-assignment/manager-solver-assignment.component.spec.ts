import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSolverAssignmentComponent } from './manager-solver-assignment.component';

describe('ManagerSolverAssignmentComponent', () => {
  let component: ManagerSolverAssignmentComponent;
  let fixture: ComponentFixture<ManagerSolverAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSolverAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSolverAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

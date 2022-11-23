import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestSolverComponent } from './show-request-solver.component';

describe('ShowRequestSolverComponent', () => {
  let component: ShowRequestSolverComponent;
  let fixture: ComponentFixture<ShowRequestSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRequestSolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequestSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

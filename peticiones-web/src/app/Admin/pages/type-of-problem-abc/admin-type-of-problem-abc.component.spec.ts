import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeOfProblemAbcComponent } from './admin-type-of-problem-abc.component';

describe('AdminTypeOfProblemAbcComponent', () => {
  let component: AdminTypeOfProblemAbcComponent;
  let fixture: ComponentFixture<AdminTypeOfProblemAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTypeOfProblemAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeOfProblemAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

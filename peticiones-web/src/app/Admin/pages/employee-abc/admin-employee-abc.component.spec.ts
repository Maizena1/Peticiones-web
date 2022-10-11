import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeAbcComponent } from './admin-employee-abc.component';

describe('AdminEmployeeAbcComponent', () => {
  let component: AdminEmployeeAbcComponent;
  let fixture: ComponentFixture<AdminEmployeeAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmployeeAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

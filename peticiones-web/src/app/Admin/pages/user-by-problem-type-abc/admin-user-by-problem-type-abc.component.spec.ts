import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserByProblemTypeAbcComponent } from './admin-user-by-problem-type-abc.component';

describe('AdminUserByProblemTypeAbcComponent', () => {
  let component: AdminUserByProblemTypeAbcComponent;
  let fixture: ComponentFixture<AdminUserByProblemTypeAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserByProblemTypeAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserByProblemTypeAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchAbcComponent } from './admin-branch-abc.component';

describe('AdminBranchAbcComponent', () => {
  let component: AdminBranchAbcComponent;
  let fixture: ComponentFixture<AdminBranchAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

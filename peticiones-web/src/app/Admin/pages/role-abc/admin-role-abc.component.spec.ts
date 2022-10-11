import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleAbcComponent } from './admin-role-abc.component';

describe('AdminRoleAbcComponent', () => {
  let component: AdminRoleAbcComponent;
  let fixture: ComponentFixture<AdminRoleAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoleAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

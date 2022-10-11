import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAbcComponent } from './admin-user-abc.component';

describe('AdminUserAbcComponent', () => {
  let component: AdminUserAbcComponent;
  let fixture: ComponentFixture<AdminUserAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

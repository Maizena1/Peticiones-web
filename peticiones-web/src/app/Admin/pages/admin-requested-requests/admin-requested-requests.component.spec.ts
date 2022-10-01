import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestedRequestsComponent } from './admin-requested-requests.component';

describe('AdminRequestedRequestsComponent', () => {
  let component: AdminRequestedRequestsComponent;
  let fixture: ComponentFixture<AdminRequestedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedRequestsModuleComponent } from './requested-requests-module.component';

describe('RequestedRequestsModuleComponent', () => {
  let component: RequestedRequestsModuleComponent;
  let fixture: ComponentFixture<RequestedRequestsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedRequestsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedRequestsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

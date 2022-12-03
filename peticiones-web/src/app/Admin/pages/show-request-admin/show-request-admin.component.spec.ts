import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestAdminComponent } from './show-request-admin.component';

describe('ShowRequestAdminComponent', () => {
  let component: ShowRequestAdminComponent;
  let fixture: ComponentFixture<ShowRequestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRequestAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMaterialDetailComponent } from './confirm-material-detail.component';

describe('ConfirmMaterialDetailComponent', () => {
  let component: ConfirmMaterialDetailComponent;
  let fixture: ComponentFixture<ConfirmMaterialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMaterialDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

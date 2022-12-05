import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailRequirementsComponent } from './dialog-detail-requirements.component';

describe('DialogDetailRequirementsComponent', () => {
  let component: DialogDetailRequirementsComponent;
  let fixture: ComponentFixture<DialogDetailRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

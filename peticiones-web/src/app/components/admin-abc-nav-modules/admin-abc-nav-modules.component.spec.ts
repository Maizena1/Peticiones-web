import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbcNavModulesComponent } from './admin-abc-nav-modules.component';

describe('AdminAbcNavModulesComponent', () => {
  let component: AdminAbcNavModulesComponent;
  let fixture: ComponentFixture<AdminAbcNavModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbcNavModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAbcNavModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

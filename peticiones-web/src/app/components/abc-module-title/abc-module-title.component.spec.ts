import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcModuleTitleComponent } from './abc-module-title.component';

describe('AbcModuleTitleComponent', () => {
  let component: AbcModuleTitleComponent;
  let fixture: ComponentFixture<AbcModuleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbcModuleTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcModuleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

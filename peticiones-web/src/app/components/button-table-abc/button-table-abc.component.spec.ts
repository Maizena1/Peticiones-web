import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTableAbcComponent } from './button-table-abc.component';

describe('ButtonTableAbcComponent', () => {
  let component: ButtonTableAbcComponent;
  let fixture: ComponentFixture<ButtonTableAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonTableAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTableAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

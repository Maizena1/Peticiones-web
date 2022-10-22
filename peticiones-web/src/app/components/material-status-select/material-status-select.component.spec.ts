import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialStatusSelectComponent } from './material-status-select.component';

describe('MaterialStatusSelectComponent', () => {
  let component: MaterialStatusSelectComponent;
  let fixture: ComponentFixture<MaterialStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialStatusSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

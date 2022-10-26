import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcTableComponent } from './abc-table.component';

describe('AbcTableComponent', () => {
  let component: AbcTableComponent;
  let fixture: ComponentFixture<AbcTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbcTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

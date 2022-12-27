import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShowCheckedComponent } from './table-show-checked.component';

describe('TableShowCheckedComponent', () => {
  let component: TableShowCheckedComponent;
  let fixture: ComponentFixture<TableShowCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableShowCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShowCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

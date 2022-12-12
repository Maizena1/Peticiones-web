import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRequerimentComponent } from './table-requeriment.component';

describe('TableRequerimentComponent', () => {
  let component: TableRequerimentComponent;
  let fixture: ComponentFixture<TableRequerimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRequerimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRequerimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

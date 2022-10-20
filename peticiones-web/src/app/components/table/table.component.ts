import { Component,ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 4, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 5, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 6, name: 'Helium', weight: 4.0026, symbol: 'He'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this. paginator;
  }

}

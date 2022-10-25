import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
  position: Number;
  name: String;
  weight: Number;
  symbol: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 7, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 8, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 9, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 10, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 11, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 12, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 13, name: 'Boron', weight: 10.811, symbol: 'B'},  
];

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})

export class RequestTableComponent implements OnInit {
  displayedColumns: String[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor() { }

  ngOnInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}

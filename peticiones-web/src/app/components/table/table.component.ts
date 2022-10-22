import { Component,ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { datatable } from 'src/app/Admin/services/type';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const Itemstable: datatable[] = [
  {col1: 1, col2: 'suc1', col3:'', col4: 'H'},
  {col1: 1, col2: 'suc1', col3:'', col4: 'H'},
  {col1: 1, col2: 'suc1', col3:'', col4: 'H'},
  {col1: 1, col2: 'suc1', col3:'', col4: 'H'},
  {col1: 1, col2: 'suc1', col3:'', col4: 'H'},  
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() itemsTable: datatable[] = []; 
  @Input() nametable: String[] = [];
            
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4'];
  dataSource = new MatTableDataSource(Itemstable);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this. paginator;
  }

}

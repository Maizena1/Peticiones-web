import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import  { MatTableDataSource } from '@angular/material/table';
import { request_table } from '../services/request-table';

@Component({
  selector: 'app-abc-table',
  templateUrl: './abc-table.component.html',
  styleUrls: ['./abc-table.component.css']
})
export class AbcTableComponent implements OnInit {

  @Input() Items: request_table[] = [];
  @Input() name_colum: String[] = [];
  @Input() type_table: String = "";

  displayedColumns: String[] = ['col1','col2','col3','col4'];
  dataSource = new MatTableDataSource(this.Items);
  nameColum: String [] = [];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor() { }

  ngOnInit () {  

    this.nameColum = this.name_colum;
    this.dataSource = new MatTableDataSource(this.Items); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
            
  }

}

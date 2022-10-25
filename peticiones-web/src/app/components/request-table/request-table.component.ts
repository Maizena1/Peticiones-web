import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { request_table } from '../services/request-table';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})

export class RequestTableComponent implements OnInit {

@Input() Items: request_table[] = [];
@Input() name_colum: string[] = [];

displayedColumns: String[] = ['col1','col2','col3','col4'];
dataSource = new MatTableDataSource(this.Items);
nameColum: string [] = [];
  
@ViewChild(MatSort, {static: true}) sort!: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    
constructor() { }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

ngOnInit(): void {  
    this.sort = this.sort;
    this.paginator = this.paginator;
    console.table(this.name_colum);
    this.nameColum = this.name_colum;
    console.table(this.Items);    
    this.dataSource = new MatTableDataSource(this.Items);    
}

}

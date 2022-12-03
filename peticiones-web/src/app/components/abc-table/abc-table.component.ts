import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import  { MatTableDataSource } from '@angular/material/table';
import { request_table } from '../services/request-table';

@Component({
  selector: 'app-abc-table',
  templateUrl: './abc-table.component.html',
  styleUrls: ['./abc-table.component.css']
})
export class AbcTableComponent<Row> implements OnInit {

  @Input() rows: Row[] = [];
  @Input() nameColumn: string[] = [];
  @Input() type_table: string = "";

  @Output() onClickAction = new EventEmitter<{id:string, action:string}>();   

  // displayedColumns: String[] = ['col1','col2','col3','col4'];
  displayedColumns = Object.keys(this.rows)
  dataSource = new MatTableDataSource(this.rows);
  nameColumns: string [] = [];  

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  onClickTableAction(id: string, action: string){
    console.log('asdasd')
    this.onClickAction.emit({id,action});  
    //alert(id +"  "+ action);      
  }

  ngOnInit () {  

    this.nameColumns = this.nameColumn;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
        //console.table(this.items);
  }

}

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
export class AbcTableComponent implements OnInit {

  @Input() items: request_table[] = [];
  @Input() nameColumn: String[] = [];
  @Input() type_table: String = "";
  @Input() optionDelete: string = 'si';
  @Input() optionEdit: string = 'si';
  @Input() optionDetail: string = 'si';


  @Output() onChange = new EventEmitter<{id:string, action:string}>();   
  

  displayedColumns: String[] = ['col1','col2','col3','col4'];
  dataSource = new MatTableDataSource(this.items);
  nameColumns: String [] = [];  

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor() { }

  getid(id: string, action: string){
    this.onChange.emit({id: id,action: action});  
    //alert(id +"  "+ action);      
  }

  ngOnInit () {  

    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
        //console.table(this.items);
  }

}
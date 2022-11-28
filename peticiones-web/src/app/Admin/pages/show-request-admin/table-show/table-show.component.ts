import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import  { MatTableDataSource } from '@angular/material/table';
import { table_show } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-table-show',
  templateUrl: './table-show.component.html',
  styleUrls: ['./table-show.component.css']
})
export class TableShowComponent implements OnInit {

  @Input() items: table_show [] = [];
  @Input() nameColumn: String[] = [];
  @Input() type_table: String = "";
  @Input() optionDelete: string = 'si';
  @Input() optionEdit: string = 'si';
  @Input() optionDetail: string = 'si';


  @Output() onChange = new EventEmitter<{fecha:string, action:string}>();   
  

  displayedColumns: String[] = ['col1','col2','col3','col4','col5'];
  dataSource = new MatTableDataSource(this.items);
  nameColumns: String [] = [];  

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor() { }

  getid(fecha: string, action: string){
    this.onChange.emit({fecha: fecha,action: action});  
    //alert(id +"  "+ action);      
  }

  ngOnInit(){  
    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
        //console.table(this.items);
  }

}

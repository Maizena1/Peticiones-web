import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import  { MatTableDataSource } from '@angular/material/table';
import { table_show } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-table-requeriment',
  templateUrl: './table-requeriment.component.html',
  styleUrls: ['./table-requeriment.component.css']
})
export class TableRequerimentComponent implements OnInit {

  @Input() items: table_show [] = [];
  @Input() nameColumn: String[] = [];  
  @Input() optionDelete: string = 'si';
  @Input() optionEdit: string = 'si';
  @Input() optionDetail: string = 'si';  
  @Input() optionRequeriment: string = 'si';  


  @Output() onChange = new EventEmitter<{id:string, action:string, descripcion:string}>();   
  

  displayedColumns: String[] = ['col1','col2','col3','col4','col5','col6'];
  dataSource = new MatTableDataSource(this.items);
  nameColumns: String [] = [];  
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor() { }

  getid(id: string, action: string, descripcion:string){
    this.onChange.emit({id: id,action: action, descripcion: descripcion});    
  }

  ngOnInit(){  
    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items);     
    this.dataSource.paginator = this.paginator;
    //console.table(this.items);
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('Mensaje desde Compnente Tabla: "Cambio Arreglo de Tabla"');
    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items); 
    //this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }  

}

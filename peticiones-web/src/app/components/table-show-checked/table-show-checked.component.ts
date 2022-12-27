import { Component, EventEmitter, Input, OnInit, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import  { MatTableDataSource } from '@angular/material/table';
import { table_show } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-table-show-checked',
  templateUrl: './table-show-checked.component.html',
  styleUrls: ['./table-show-checked.component.css']
})
export class TableShowCheckedComponent implements OnInit {

  @Input() items: table_show [] = [];
  @Input() nameColumn: String[] = [];
  @Input() type_table: String = "";
  @Input() optionDelete: string = 'si';
  @Input() optionChecked: string = 'no';
  @Input() optionEdit: string = 'si';
  @Input() optionDetail: string = 'si';
  @Input() optionFilter: string = 'si';
  @Input() optionRequeriment: string = 'si';

  @Output() onChange = new EventEmitter<{fecha:string, action:string, prioridad: string}>();   
    
  displayedColumns: String[] = ['col1','col2','col3','col4','col5','col6'];
  dataSource = new MatTableDataSource(this.items);
  nameColumns: String [] = [];  

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }


  getid(fecha: string, action: string, prioridad: boolean){    
    //alert(prioridad);    
    if(prioridad == true){
      this.onChange.emit({fecha: fecha,action: action, prioridad:"Alta" });                
    }else{
      this.onChange.emit({fecha: fecha,action: action, prioridad:"Normal" });                
    }   
  }

  ngOnInit(){  
    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    //console.log('Mensaje desde Compnente Tabla: "Cambio Arreglo de Tabla"');    
    this.nameColumns = this.nameColumn;
    this.dataSource = new MatTableDataSource(this.items); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }  

}

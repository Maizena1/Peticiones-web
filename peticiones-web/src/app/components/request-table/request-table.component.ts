import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { request_table } from '../services/request-table';

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
];


@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent implements OnInit {

//recibir datos
@Input() Items: request_table[] = [];
@Input() name_colum: string[] = [];

//

//declaracion de lo necesario para usar 
displayedColumns: String[] = [];
dataSource = new MatTableDataSource(this.Items);
nameColum: string [] = [];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['col1', 'col2', 'col3', 'col4'];
    this.dataSource = new MatTableDataSource(this.Items);
    this.nameColum = this.name_colum;    
  }

}

import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css']
})
export class TableMaterialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['material', 'cantidad', 'unidad', 'precio'];
  dataSource = new MatTableDataSource<RequerimentProblem>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface RequerimentProblem {
  id_problema: number;
  id_requisito: number; 
  name: string;
  unidad: string;
  cantidad: number;
  precio: number;
}

const ELEMENT_DATA: RequerimentProblem[] = [
  { id_problema: 1,id_requisito: 1,name: 'Focos', unidad: 'Pieza', cantidad: 2, precio: 40.00},  
];

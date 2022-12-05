import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { requeriment } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-dialog-detail-requirements',
  templateUrl: './dialog-detail-requirements.component.html',
  styleUrls: ['./dialog-detail-requirements.component.css']
})
export class DialogDetailRequirementsComponent implements OnInit {

  displayedColumns: string[] = ['nombre_articulo','descripcion_requisito','cantidad','unidad','precio'];
  dataSource = new MatTableDataSource(this.data);

  constructor(@Inject(MAT_DIALOG_DATA) public data: requeriment [],) { }
    
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);     
  }

}

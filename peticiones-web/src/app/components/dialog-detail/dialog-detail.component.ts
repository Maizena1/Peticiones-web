import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {

  arrayData : any [] = [];
  arrayFecha: any [] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: [{title: string, data: string}],) { }

  ngOnInit(): void {

    //console.log(this.data.length);

    if(this.data.find(element => element.title == 'Fecha Solicitud:' )){
      for(let i = 0 ; i < 7 ; i++){
        this.arrayData.push(this.data[i]);
      }
      for(let i = 7 ; i < 13 ; i++){
        this.arrayFecha.push(this.data[i]);
      }
      //console.table(this.arrayData);
      //console.table(this.arrayFecha);      
    }else{
      this.arrayData = this.data;
    }

  }

}

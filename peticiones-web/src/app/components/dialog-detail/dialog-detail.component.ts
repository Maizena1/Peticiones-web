import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: [{title: string, data: string }]) { }

  ngOnInit(): void {
  }

}

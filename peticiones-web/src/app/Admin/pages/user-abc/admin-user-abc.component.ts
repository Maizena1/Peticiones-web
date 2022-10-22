import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';

@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {


  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

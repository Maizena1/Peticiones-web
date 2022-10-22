import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';

@Component({
  selector: 'app-admin-user-by-problem-type-abc',
  templateUrl: './admin-user-by-problem-type-abc.component.html',
  styleUrls: ['./admin-user-by-problem-type-abc.component.css']
})
export class AdminUserByProblemTypeAbcComponent implements OnInit {

  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

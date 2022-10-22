import { Component, OnInit } from '@angular/core';
import { ItemSelect } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-requested-requests-module',
  templateUrl: './requested-requests-module.component.html',
  styleUrls: ['./requested-requests-module.component.css']
})
export class RequestedRequestsModuleComponent implements OnInit {

  status: ItemSelect[] = [
    {option:'En espera'},
    {option:'Aceptado'},
    {option:'Revision'},
    {option:'En espera'},
    {option:'En espera'},
  ]

  typeOfProblem: ItemSelect[] = [
    {option:'Electrico'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

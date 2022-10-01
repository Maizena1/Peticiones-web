import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
@Input() nombre: string = 'Elija opcion'; 


  constructor() { }

  ngOnInit(): void {
  }

}

import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  //se recibe
  @Input() label: String = 'sin nombre';
  @Input() tipo: String = 'text';
  @Input() example: String = 'sin nombre';
  @Input() value: String ='';

  //se envia
  @Output() onChange = new EventEmitter<String>(); 
  @Output() KeyUp = new EventEmitter<String>();    

  constructor() { }

  getdata( data : String ){
    this.onChange.emit(data);
  }

  getTextPress(data: String){
    this.KeyUp.emit(data);
  }

  ngOnInit(): void {
  }

}

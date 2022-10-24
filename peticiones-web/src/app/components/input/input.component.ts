import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html', 
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  //se recibe
  @Input() label: string = 'sin nombre';
  @Input() type: string = 'text';
  @Input() example: string = 'sin nombre';
  @Input() value: string ='';


  //se envia
  @Output() onChange = new EventEmitter<string>(); 
  @Output() KeyUp = new EventEmitter<string>();    

  constructor() { }

  //para la validacion del input
  InputFormControl = new FormControl('', [Validators.required]);

  getdata( data : string ){
    this.onChange.emit(data);
  }

  getTextPress(data: string){
    this.KeyUp.emit(data);
  }

  ngOnInit(): void {
  }

}

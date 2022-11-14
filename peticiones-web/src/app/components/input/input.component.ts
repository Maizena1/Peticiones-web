import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {FormControl, NgModel, Validators} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html', 
  styleUrls: ['./input.component.css'],
})

export class InputComponent implements OnInit {
  @Input() value: string ='';

  @Output() valueChange = new EventEmitter<any>();


  @Input() label: string = 'sin nombre';
  @Input() type: string = 'text';
  @Input() example: string = 'sin nombre';
  @Input() enable: boolean = false;


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

  onChangeInput(event: any){
    this.valueChange.emit(event.target.value);
  }


  ngOnInit(): void {
  }

}

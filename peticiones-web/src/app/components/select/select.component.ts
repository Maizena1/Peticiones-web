import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Item, ItemSelect } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent<T> implements OnInit {  

  
  @Input() getId: (item?: T) => string = () => '';
  @Input() getLabel: (item?: T) => string = () => '';

  @Input() value: string = '';  
  @Output() valueChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<string>();
  
  
  @Input() label: string = 'sin nombre'; 
  @Input() items: T[] = []; 
  @Input() disabled: boolean = false ; 
  
  constructor() {}

  SelectFormControl = new FormControl('', [Validators.required]);
  
  getdata(item: T){
    //console.log(data);    
    this.valueChange.emit(item);
    this.onChange.emit(String(item));
    //console.log(item);
    //alert(data);
  }


  
  ngOnInit(): void {    
    
  }  

}

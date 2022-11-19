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
  
  
  @Input() label: string = 'sin nombre'; 
  @Input() items: T[] = []; 
  @Input() valuenum: number = 0;
  @Input() disabled: boolean = false ; 
  valor : String='';
  //se envia 
  @Output() onChange = new EventEmitter<string>();    
  
  constructor() {}

  SelectFormControl = new FormControl('', [Validators.required]);
  
  getdata( data: string){
    //console.log(data);    
    this.onChange.emit(data);
    //alert(data);
  }

  ngOnInit(): void {    
    
  }  

}

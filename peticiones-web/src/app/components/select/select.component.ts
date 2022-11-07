import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Item, ItemSelect } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() label: string = 'sin nombre'; 
  @Input() items: Item[] = []; 
  @Input() valuenum: string = '';    
  //se envia 
  @Output() onChange = new EventEmitter<string>();    
  
  constructor() {}

  SelectFormControl = new FormControl('', [Validators.required]);
  
  getdata( data: string){
    //console.log(data);    
    this.onChange.emit(data);
  }

  ngOnInit(): void {        
  }  
  
}

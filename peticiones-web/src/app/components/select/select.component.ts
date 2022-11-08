import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Item, ItemSelect } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  // @Input() valuenum: string = '0';  z

  @Input() value: string = '';
  
  @Output() valueChange = new EventEmitter<any>();
  
  
  @Input() label: string = 'sin nombre'; 
  @Input() items: Item[] = []; 
  @Input() valuenum: string = '';  
  valor : String='';
  //se envia 
  @Output() onChange = new EventEmitter<string>();    
  
  constructor() {}

  SelectFormControl = new FormControl('', [Validators.required]);
  
  getdata( data: string){
    //console.log(data);    
    this.onChange.emit(data);
  }

  ngOnInit(): void {    
    if(this.valuenum !== ''){
      this.valor = this.valuenum;
    }    
  }  

  Revisardato():String{
    if(this.valuenum !== ''){
      this.valor = this.valuenum;
      return this.valor;
    }else{
      return '0';
    }
  }

}

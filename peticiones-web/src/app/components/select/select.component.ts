import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() label: string = 'sin nombre'; 
  @Input() items: Item[] = []; 
  @Input() valuenum: String = '';
  @Input() enable: String | null = null;
  
  valor: String='';
  //se envia 
  @Output() onChange = new EventEmitter<String>();    

  constructor() { }

  getdata( data: String){
    //console.log(data);    
    this.onChange.emit(data);
  }

  ngOnInit(): void {
    if(this.valuenum !== ""){
      this.valor = this.valuenum;
    }    
  }  

}

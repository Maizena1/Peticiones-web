import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {


//se recibe
@Input() label: String = 'sin nombre';
@Input() tipo: String = 'number';
@Input() example: String = 'sin nombre';
@Input() value: String="";

//se envia
@Output() onChange = new EventEmitter<number>(); 
@Output() KeyUp = new EventEmitter<number>();    

constructor() { }

valor : number | any;

getdata( data : string ){

 this.valor = parseInt(data);  
 this.onChange.emit(this.valor);
}

getTextPress(data: string){
  this.valor = parseInt(data);  
  this.KeyUp.emit(this.valor);
}

ngOnInit(): void {
}

}

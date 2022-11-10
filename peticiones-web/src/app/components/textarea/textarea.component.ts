import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() label: string = 'sin nombre';
  @Input() type: string = 'text';
  @Input() example: string = 'sin nombre';
  @Input() enable: boolean = false;
  @Input() value: string = '';


  //se envia
  @Output() onChange = new EventEmitter<string>();   
  @Output() KeyUp = new EventEmitter<string>();    

  constructor() { }    

  getdata( data : string ){
    this.onChange.emit(data);
  }
  

  ngOnInit(): void {
  }



}

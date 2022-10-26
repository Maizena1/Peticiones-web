import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-table-abc',
  templateUrl: './button-table-abc.component.html',
  styleUrls: ['./button-table-abc.component.css']
})
export class ButtonTableAbcComponent implements OnInit {

  @Output() onClick = new EventEmitter();
  @Input() icon: string;
  @Input() clase: string;
  @Input() disable: boolean;
  users = [];

  constructor() {
    this.icon = "";
    this.clase = ""
    this.disable = false;
  }

  ngOnInit(): void {

    if(this.disable){
      this.clase += " disable";
    }
  }

  handleOnClick() {
    if(!this.disable){
      this.onClick.emit();
    }
  }


}

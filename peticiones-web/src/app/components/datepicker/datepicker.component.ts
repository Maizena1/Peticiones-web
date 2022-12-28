import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Input() label: string = ''; 

  @Output() dateChange = new EventEmitter<Date>();

  constructor() { }
  today = new Date();

  onDateChange(date: Date) {    
    //alert(date);
    this.dateChange.emit(date);
  }

  ngOnInit(): void {
  }

}

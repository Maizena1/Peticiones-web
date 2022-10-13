import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Input() label: string | undefined; 

  constructor() { }

  ngOnInit(): void {
  }

}

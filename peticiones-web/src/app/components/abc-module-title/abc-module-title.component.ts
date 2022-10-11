import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abc-module-title',
  templateUrl: './abc-module-title.component.html',
  styleUrls: ['./abc-module-title.component.css']
})
export class AbcModuleTitleComponent implements OnInit {

@Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

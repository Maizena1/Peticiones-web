import { Component, OnInit, Input } from '@angular/core';
import { ItemSelect } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-material-status-select',
  templateUrl: './material-status-select.component.html',
  styleUrls: ['./material-status-select.component.css']
})
export class MaterialStatusSelectComponent implements OnInit {
  @Input() label: string = 'sin nombre'; 
  @Input() items: ItemSelect[] = []; 
  @Input() valuenum: String = '';
  @Input() enable: String | null = null;
  valor: String='';

  constructor() { }

  ngOnInit(): void {
  }

}

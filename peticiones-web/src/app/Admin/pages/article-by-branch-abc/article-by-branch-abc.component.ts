import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';

@Component({
  selector: 'app-article-by-branch-abc',
  templateUrl: './article-by-branch-abc.component.html',
  styleUrls: ['./article-by-branch-abc.component.css']
})
export class ArticleByBranchAbcComponent implements OnInit {
  
  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

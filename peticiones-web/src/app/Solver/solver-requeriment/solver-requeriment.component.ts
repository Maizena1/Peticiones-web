import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Admin/services/admin.service';


@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  problemArticle: [] = [];

  constructor(private APIPetition: AdminService) { }

  ngOnInit(): void {

    this.APIPetition.getArticlesProblems().subscribe(article => { 
      this.problemArticle = article;
    });

    
  }

}

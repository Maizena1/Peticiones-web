import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-user-by-problem-type-abc',
  templateUrl: './admin-user-by-problem-type-abc.component.html',
  styleUrls: ['./admin-user-by-problem-type-abc.component.css']
})
export class AdminUserByProblemTypeAbcComponent implements OnInit {

  problemType: [] = [];

  constructor(private APIPetition: AdminService) { }

  ngOnInit(): void {

    this.APIPetition.getTypeProblems().subscribe(types => { 
      this.problemType = types;
    });
  
  }

  getId(item: any){
    return item.id_tipo_problema;
  }

  getLabel(item: any){
    return item.tipo_problema;
  }

}

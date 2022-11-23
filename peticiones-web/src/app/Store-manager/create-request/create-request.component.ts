import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/Admin/services/admin.service';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  form = {
    problemType: '',
    descriptionProblem: ''
  }

  descriptionProblem: string = '';

  problemTypes: [] = [];

  constructor(private APIPetition: AdminService) { }

  ngOnInit(): void {

    this.APIPetition.getTypeProblems().subscribe(types => { 
      this.problemTypes = types;
    });
    
  }

  getId(item: any){
    return item.id_tipo_problema;
  }

  getLabel(item: any){
    return item.tipo_problema;
  }

  getProblemType(type: any){
    this.form.problemType = type;
  }

}

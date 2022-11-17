import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTypeOfProblemAbcComponent } from '../Admin/pages/type-of-problem-abc/admin-type-of-problem-abc.component';
import { AdminUserAbcComponent } from '../Admin/pages/user-abc/admin-user-abc.component';
import { AdminUserByProblemTypeAbcComponent } from '../Admin/pages/user-by-problem-type-abc/admin-user-by-problem-type-abc.component';
import { AdminEmployeeAbcComponent } from '../Admin/pages/employee-abc/admin-employee-abc.component';
import { AdminBranchAbcComponent } from '../Admin/pages/branch-abc/admin-branch-abc.component';
import { CreateRequestComponent } from '../Store-manager/create-request/create-request.component';
import { RequestedRequestsModuleComponent } from '../Store-manager/requested-requests-module/requested-requests-module.component';
import { ConfirmMaterialDetailComponent } from '../Solver/confirm-material-detail/confirm-material-detail.component';
import { SolverRequerimentComponent } from '../Solver/solver-requeriment/solver-requeriment.component';
import { ArticleAbcComponent } from '../Admin/pages/article-abc/article-abc.component';
import { ArticleByBranchAbcComponent } from '../Admin/pages/article-by-branch-abc/article-by-branch-abc.component';
import { LoginComponent } from '../login/login.component';
import { RelationArticleBytypeProblemAbcComponent } from '../Admin/pages/relation-article-bytype-problem-abc/relation-article-bytype-problem-abc.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{path: '', redirectTo: '/login', pathMatch: 'full'},    
  { path: 'admin', children: [
      { path: 'createRequest', component: CreateRequestComponent },
      { path: 'articleAbc', component: ArticleAbcComponent },
      { path: 'articleByBranchAbc', component: ArticleByBranchAbcComponent },
      { path: 'branchAbc', component: AdminBranchAbcComponent },
      { path: 'employeeAbc', component: AdminEmployeeAbcComponent },
      { path: 'typeOfPRoblemAbc', component: AdminTypeOfProblemAbcComponent },
      { path: 'userAbc', component: AdminUserAbcComponent },
      { path: 'userByProblemTypeAbc', component: AdminUserByProblemTypeAbcComponent },
      { path: 'articleByProblem', component: RelationArticleBytypeProblemAbcComponent },
      { path: '**', component: AdminBranchAbcComponent },
    ],
  },
  { path: 'storeManager', children: [
      { path: 'createRequest', component: CreateRequestComponent },
      { path: 'requestedRequestModule', component: RequestedRequestsModuleComponent },
      { path: '**', component: CreateRequestComponent },
    ],
  },
  { path: 'solver', children: [
      { path: 'confirmMaterial', component: ConfirmMaterialDetailComponent },
      { path: 'requerimentComponent', component: SolverRequerimentComponent },
      { path: '**', component: ConfirmMaterialDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

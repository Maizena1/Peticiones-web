import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBranchAbcComponent } from '../Admin/pages/branch-abc/admin-branch-abc.component';
import { AdminRoleAbcComponent } from '../Admin/pages/role-abc/admin-role-abc.component';
import { AdminTypeOfProblemAbcComponent } from '../Admin/pages/type-of-problem-abc/admin-type-of-problem-abc.component';
import { AdminUserAbcComponent } from '../Admin/pages/user-abc/admin-user-abc.component';
import { AdminUserByProblemTypeAbcComponent } from '../Admin/pages/user-by-problem-type-abc/admin-user-by-problem-type-abc.component';
import { AdminEmployeeAbcComponent } from '../Admin/pages/employee-abc/admin-employee-abc.component';

const routes: Routes = [
  { path: 'BranchAbc', component: AdminBranchAbcComponent},
  { path: 'EmployeeAbc', component: AdminEmployeeAbcComponent},
  { path: 'RoleAbc', component: AdminRoleAbcComponent},
  { path: 'TypeOfPRoblemAbc', component: AdminTypeOfProblemAbcComponent},
  { path: 'UserAbc', component: AdminUserAbcComponent},
  { path: 'UserByProblemTypeAbc', component: AdminUserByProblemTypeAbcComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

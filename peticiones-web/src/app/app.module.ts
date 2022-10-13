
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import  {MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';


import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SolverRequerimentComponent } from './Solver/solver-requeriment/solver-requeriment.component';
import { AdminAbcNavModulesComponent } from './components/admin-abc-nav-modules/admin-abc-nav-modules.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TableComponent } from './components/table/table.component';
import { AbcModuleTitleComponent } from './components/abc-module-title/abc-module-title.component';
import { AdminEmployeeAbcComponent } from './Admin/pages/employee-abc/admin-employee-abc.component';
import { AdminUserAbcComponent } from './Admin/pages/user-abc/admin-user-abc.component';
import { AdminRoleAbcComponent } from './Admin/pages/role-abc/admin-role-abc.component';
import { AdminTypeOfProblemAbcComponent } from './Admin/pages/type-of-problem-abc/admin-type-of-problem-abc.component';
import { AdminBranchAbcComponent } from './Admin/pages/branch-abc/admin-branch-abc.component';
import { AdminUserByProblemTypeAbcComponent } from './Admin/pages/user-by-problem-type-abc/admin-user-by-problem-type-abc.component';
import { RequestedRequestsModuleComponent } from './Admin/pages/requested-requests-module/requested-requests-module.component';
import { ConfirmMaterialDetailComponent } from './Solver/confirm-material-detail/confirm-material-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectComponent,
    CardComponent,
    ButtonComponent,
    DatepickerComponent,
    SolverRequerimentComponent,
    InputComponent,
    TextareaComponent,
    AdminBranchAbcComponent,
    AdminAbcNavModulesComponent,
    TableComponent,
    AbcModuleTitleComponent,
    AdminEmployeeAbcComponent,
    AdminUserAbcComponent,
    AdminRoleAbcComponent,
    AdminTypeOfProblemAbcComponent,
    AdminUserByProblemTypeAbcComponent,
    RequestedRequestsModuleComponent,
    ConfirmMaterialDetailComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

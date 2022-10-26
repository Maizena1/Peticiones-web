
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SolverRequerimentComponent } from './Solver/solver-requeriment/solver-requeriment.component';
import { AdminAbcNavModulesComponent } from './components/admin-abc-nav-modules/admin-abc-nav-modules.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { AbcModuleTitleComponent } from './components/abc-module-title/abc-module-title.component';
import { AdminEmployeeAbcComponent } from './Admin/pages/employee-abc/admin-employee-abc.component';
import { AdminUserAbcComponent } from './Admin/pages/user-abc/admin-user-abc.component';
import { AdminTypeOfProblemAbcComponent } from './Admin/pages/type-of-problem-abc/admin-type-of-problem-abc.component';
import { AdminUserByProblemTypeAbcComponent } from './Admin/pages/user-by-problem-type-abc/admin-user-by-problem-type-abc.component';
import { RequestedRequestsModuleComponent } from './Store-manager/requested-requests-module/requested-requests-module.component';
import { ConfirmMaterialDetailComponent } from './Solver/confirm-material-detail/confirm-material-detail.component';
import { AdminBranchAbcComponent } from './Admin/pages/branch-abc/admin-branch-abc.component';
import { CreateRequestComponent } from './Store-manager/create-request/create-request.component';
import { ArticleAbcComponent } from './Admin/pages/article-abc/article-abc.component';
import { ArticleByBranchAbcComponent } from './Admin/pages/article-by-branch-abc/article-by-branch-abc.component';
import { MaterialStatusSelectComponent } from './components/material-status-select/material-status-select.component';
import { AbcTableComponent } from './components/abc-table/abc-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectComponent,
    DatepickerComponent,
    SolverRequerimentComponent,
    InputComponent,
    TextareaComponent,
    AdminBranchAbcComponent,
    AdminAbcNavModulesComponent,
    AbcModuleTitleComponent,
    AdminEmployeeAbcComponent,
    AdminUserAbcComponent,
    AdminTypeOfProblemAbcComponent,
    AdminUserByProblemTypeAbcComponent,
    RequestedRequestsModuleComponent,
    ConfirmMaterialDetailComponent,
    CreateRequestComponent,    
    ArticleAbcComponent,
    ArticleByBranchAbcComponent,
    MaterialStatusSelectComponent,
    AbcTableComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
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
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

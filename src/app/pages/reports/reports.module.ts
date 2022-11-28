import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { TableComponent } from './table/table.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PoliticalpartyComponent } from './politicalparty/politicalparty.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent,
    CandidateComponent,
    PoliticalpartyComponent,
    DashboardComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbCardModule,
    FormsModule,
  ]
})
export class ReportsModule { }

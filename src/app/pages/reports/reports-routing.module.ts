import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PoliticalpartyComponent } from './politicalparty/politicalparty.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'mesas',
    component: TableComponent,
  },
  {
    path: 'candidatos',
    component: CandidateComponent,
  },
  {
    path: 'partidos',
    component: PoliticalpartyComponent,
  },
  {
    path: 'general',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

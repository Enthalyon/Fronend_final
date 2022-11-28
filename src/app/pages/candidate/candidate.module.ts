import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    NbCardModule,
    FormsModule,
  ]
})
export class CandidateModule { }

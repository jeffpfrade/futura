import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './personal-details.component';
import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { SummaryComponent } from '../components/summary/summary.component';
import { SummaryModule } from '../components/summary/summary.module';



@NgModule({
  declarations: [
    PersonalDetailsComponent
  ],
  imports: [
    CommonModule,
    SummaryModule,
    PersonalDetailsRoutingModule
  ]
})
export class PersonalDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './personal-details.component';
import { PersonalDetailsRoutingModule } from './personal-details-routing.module';



@NgModule({
  declarations: [
    PersonalDetailsComponent
  ],
  imports: [
    CommonModule,
    PersonalDetailsRoutingModule
  ]
})
export class PersonalDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessAccountComponent } from './access-account.component';
import { AccessAccountRoutingModule } from './access-account-routing.module';



@NgModule({
  declarations: [
    AccessAccountComponent
  ],
  imports: [
    CommonModule,
    AccessAccountRoutingModule
  ]
})
export class AccessAccountModule { }

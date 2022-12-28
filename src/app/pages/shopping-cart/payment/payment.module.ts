import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { SummaryModule } from '../components/summary/summary.module';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    SummaryModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }

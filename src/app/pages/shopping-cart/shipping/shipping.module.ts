import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { ShippingRoutingModule } from './shipping-routing.module';
import { SummaryModule } from '../components/summary/summary.module';



@NgModule({
  declarations: [
    ShippingComponent
  ],
  imports: [
    CommonModule,
    SummaryModule,
    ShippingRoutingModule
  ]
})
export class ShippingModule { }

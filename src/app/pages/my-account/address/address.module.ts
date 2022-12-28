import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address-routing.module';
import { AddAddressComponent } from './add-address/add-address.component';


@NgModule({
  declarations: [
    AddressComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule
  ]
})
export class AddressModule { }

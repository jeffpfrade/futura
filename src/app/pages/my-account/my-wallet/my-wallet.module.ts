import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWalletComponent } from './my-wallet.component';
import { MyWalletRoutingModule } from './my-wallet-routing.module';
import { AddMoneyComponent } from './add-money/add-money.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyWalletComponent,
    AddMoneyComponent
  ],
  imports: [
    CommonModule,
    MyWalletRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyWalletModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoneyComponent } from './add-money.component';

const routes: Routes = [
  { path: '', component: AddMoneyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMoneyRoutingModule { }

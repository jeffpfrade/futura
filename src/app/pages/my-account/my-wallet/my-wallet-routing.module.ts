import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWalletComponent } from './my-wallet.component';

const routes: Routes = [
  { path: 'add-money', loadChildren: () => import("./add-money/add-money.module").then(m => m.AddMoneyModule) },
  { path: '', component: MyWalletComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWalletRoutingModule { }

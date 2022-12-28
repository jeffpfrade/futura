import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
const routes: Routes = [
  { path: 'confirmation', loadChildren: () => import("./confirmation/confirmation.module").then(m => m.ConfirmationModule) },
  { path: 'payment', loadChildren: () => import("./payment/payment.module").then(m => m.PaymentModule) },
  { path: 'shipping', loadChildren: () => import("./shipping/shipping.module").then(m => m.ShippingModule) },
  { path: 'personal-details', loadChildren: () => import("./personal-details/personal-details.module").then(m => m.PersonalDetailsModule) },
  { path: '', component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }

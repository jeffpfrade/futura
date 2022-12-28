import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { path: 'my-wallet', loadChildren: () => import("./my-wallet/my-wallet.module").then(m => m.MyWalletModule) },
  { path: 'favorites', loadChildren: () => import("./favorites/favorites.module").then(m => m.FavoritesModule) },
  { path: 'my-orders', loadChildren: () => import("./my-orders/my-orders.module").then(m => m.MyOrdersModule) },
  { path: 'address', loadChildren: () => import("./address/address.module").then(m => m.AddressModule) },
  { path: 'personal-details', loadChildren: () => import("./personal-details/personal-details.module").then(m => m.PersonalDetailsModule) },
  { path: 'access-account', loadChildren: () => import("./access-account/access-account.module").then(m => m.AccessAccountModule) },
  { path: '', component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address.component';

const routes: Routes = [
  { path: 'add-address', loadChildren: () => import("./add-address/add-address.module").then(m => m.AddAddressModule) },
  { path: '', component: AddressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }

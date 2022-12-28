import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAccountComponent } from './access-account.component';

const routes: Routes = [
  { path: '', component: AccessAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessAccountRoutingModule { }

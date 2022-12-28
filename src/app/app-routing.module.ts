import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  { path: 'product/:id', loadChildren: () => import("./pages/product/product.module").then(m => m.ProductModule) },
  { path: 'shopping-cart', loadChildren: () => import("./pages/shopping-cart/shopping-cart.module").then(m => m.ShoppingCartModule) },
  { path: 'my-account', loadChildren: () => import("./pages/my-account/my-account.module").then(m => m.MyAccountModule) },
  { path: 'register', loadChildren: () => import("./pages/register/register.module").then(m => m.RegisterModule) },
  { path: 'sign-in', loadChildren: () => import("./pages/sign-in/sign-in.module").then(m => m.SignInModule) },
  { path: '', loadChildren: () => import("./pages/main-page/main-page.module").then(m => m.MainPageModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Hace scroll hasta el principio de la pagina cada vez q se cambia de url
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

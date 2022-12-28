import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { SliderComponent } from './components/slider/slider.component';
import { RelevantCategoriesComponent } from './components/relevant-categories/relevant-categories.component';
import { ProductsInterestComponent } from './components/products-interest/products-interest.component';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    MainPageComponent,
    SliderComponent,
    RelevantCategoriesComponent,
    ProductsInterestComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CategoriesComponent} from "./categories/categories.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";
import {PageComponent} from "./page/page.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: CategoryDetailComponent},
  {path: 'page/:id', component: PageComponent},
  {path: 'categories', component: CategoriesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [

  {
    path: '',
    component: DashboardPage,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
      },{
        path:'home',
        component:HomeComponent
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CollectionComponent } from './collection/collection.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Default route for the welcome page
  { path: 'collection', component: CollectionComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclaimerComponent } from './shared/components/disclaimer/disclaimer.component';
import { ResultsComponent } from './shared/components/results/results.component';

const routes: Routes = [
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'disclaimer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

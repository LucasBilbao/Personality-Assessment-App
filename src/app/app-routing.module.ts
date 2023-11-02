import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { DisclaimerComponent } from './shared/components/disclaimer/disclaimer.component';
import { AuthorizedGuard } from './guards/authorized/authorized.guard';
import { ThanksComponent } from './shared/components/thanks/thanks.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ResultsComponent } from './shared/components/results/results.component';

const routes: Routes = [
  { path: 'registration', component: SignupComponent },
  {
    path: 'disclaimer',
    canActivate: [AuthorizedGuard],
    component: DisclaimerComponent,
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'thanks',
    canActivate: [AuthorizedGuard],
    component: ThanksComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'results',
    canActivate: [AuthorizedGuard],
    component: ResultsComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'registration' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

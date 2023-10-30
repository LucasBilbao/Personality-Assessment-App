import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizzesComponent } from './quizzes.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizComponent } from './quiz/quiz.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [QuizzesComponent, QuizComponent],
  imports: [SharedModule, QuizzesRoutingModule, MatCardModule],
  exports: [QuizzesComponent],
})
export class QuizzesModule {}

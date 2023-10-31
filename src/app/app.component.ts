import { Component } from '@angular/core';
import { QuizStateFacade } from './store/facades/quiz.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'paa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'personality-assessment';
  public isLoading$: Observable<boolean> = this.quizFacade.isLoading$;

  constructor(private quizFacade: QuizStateFacade) {}
}

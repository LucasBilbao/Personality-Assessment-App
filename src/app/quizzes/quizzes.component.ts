import { Component, OnInit } from '@angular/core';
import { QuizCollection } from '../models/quiz.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizStateFacade } from '../store/facades/quiz.facade';
import { QuizCategoryType } from '../models/quizCategory.type';
import { PersonalityCodeType } from '../models/personalityCode.type';
import { Subscribable } from '../shared/components/subscribable/subscribable.component';
import { Selections } from '../models/selections.type';
import { QuizService } from '../services/quiz/quiz.service';

@Component({
  selector: 'paa-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent extends Subscribable implements OnInit {
  public categories: QuizCategoryType[] = [...this.quizService.categories];
  public activeIndex$$ = new BehaviorSubject<number>(0);
  public quizCollection$: Observable<QuizCollection | null> =
    this.quizFacade.quizCollection$;
  public isLoading$: Observable<boolean> = this.quizFacade.isLoading$;
  public selections: Selections = {
    fictionals: [],
    animals: [],
    facebookers: [],
    celebrities: [],
    ornaments: [],
  };

  constructor(
    private quizFacade: QuizStateFacade,
    private quizService: QuizService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.activeIndex$$.subscribe((activeIndex) => {
        this.quizFacade.getQuizCollection(this.categories[activeIndex]);
      })
    );
  }

  public changePage(direction: number): void {
    if (
      this.activeIndex$$.value + direction < 0 ||
      this.activeIndex$$.value + direction > this.categories.length - 1
    ) {
      return;
    }
    this.activeIndex$$.next(this.activeIndex$$.value + direction);
    window.scroll({
      top: 0,
      left: 0,
    });
  }

  public onSelection(personalityCode: PersonalityCodeType): void {
    const activeCategory = this.categories[this.activeIndex];
    this.selections[activeCategory].push(personalityCode);
  }

  public onEnd(): void {
    this.quizService.calcResults(this.selections);
  }

  public get activeIndex(): number {
    return this.activeIndex$$.value;
  }

  public get activeCategory(): QuizCategoryType {
    return this.categories[this.activeIndex];
  }
}

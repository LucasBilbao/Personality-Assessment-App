import { Component, OnInit } from '@angular/core';
import { QuizCollection } from '../models/quiz.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'paa-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  public categories = [
    'fictionals',
    'animals',
    'facebookers',
    'celebrities',
    'ornaments',
  ];
  public activeIndex = 4;

  public quizCollection!: QuizCollection;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ quiz: QuizCollection }>(
        `http://localhost:8000/api/v1/quizzes/${
          this.categories[this.activeIndex]
        }`
      )
      .subscribe((payload) => {
        this.quizCollection = payload.quiz;
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';
import { QuizCollection } from 'src/app/models/quiz.interface';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';
import { Selections } from 'src/app/models/selections.type';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public readonly categories: QuizCategoryType[] = [
    'fictionals',
    'animals',
    'facebookers',
    'celebrities',
    'ornaments',
  ];
  private results: { [key: string]: number } = {
    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
    r5: 0,
    r6: 0,
    r7: 0,
    r8: 0,
    r9: 0,
    r10: 0,
    r11: 0,
    r12: 0,
    r13: 0,
    r14: 0,
    r15: 0,
    r16: 0,
  };
  private selections!: Selections;

  constructor(private http: HttpClient) {}

  public getQuizCollection(
    category: QuizCategoryType
  ): Observable<{ quiz: QuizCollection }> {
    return this.http.get<{ quiz: QuizCollection }>(
      `/api/v1/quizzes/${category}`
    );
  }

  public calcResults(selections: Selections): void {
    this.selections = selections;
    this.resultsGenerator();
    const resultsSortedByValue = this.sortResultsByValue();
    const sortedResultSubArrays =
      this.getSubArraysByValues(resultsSortedByValue);
    sortedResultSubArrays.sort((a, b) => a[0][1] - b[0][1]);
    sortedResultSubArrays.reverse();

    const resultsSortedByValueAndSelectionOrder: [string, number][] =
      sortedResultSubArrays
        .map(this.sortResultsBySelectionOrder.bind(this))
        .flat(1);

    const personalities = [
      resultsSortedByValueAndSelectionOrder[0][0],
      resultsSortedByValueAndSelectionOrder[1][0],
    ];
  }

  private resultsGenerator(): void {
    Object.keys(this.results).forEach((pCode) => {
      const resultArr: number[] = [];
      Object.values(this.selections).forEach((pCodes) => {
        const pCodeT = pCode as PersonalityCodeType;

        if (!pCodes.includes(pCodeT)) {
          return;
        }
        resultArr.push(1 / pCodes.length);
      });

      if (resultArr.length === 0) {
        this.results[pCode] = 0;
        return;
      }
      this.results[pCode] = Math.min(...resultArr);
    });
  }

  private sortResultsByValue(): [string, number][] {
    const values = Object.entries(this.results);
    values.sort(([_1, a], [_2, b]) => a - b);
    values.reverse();

    return [...values];
  }

  private getSubArraysByValues(
    resultsSortedByValue: [string, number][]
  ): [string, number][][] {
    const subArrays = resultsSortedByValue.reduce(
      (groups: { [key: number]: [string, number][] }, result) => {
        const group: [string, number][] = groups[result[1]] || [];
        group.push(result);
        groups[result[1]] = group;
        return groups;
      },
      {}
    );
    return Object.values(subArrays);
  }

  private sortResultsBySelectionOrder(
    sortedResultSubArray: [string, number][]
  ): [string, number][] {
    const exists: { [key: string]: boolean } = {};
    const selectedOrderNoDuplicates = this.categories
      .map((category) => this.selections[category])
      .flat(Infinity)
      .filter((item) => {
        if (exists[item as string]) {
          return false;
        }
        exists[item as string] = true;
        return true;
      });

    const unorderedPCodes = sortedResultSubArray.map((item) => item[0]);

    const sortedBySelectionOrder: string[] = [];
    selectedOrderNoDuplicates.forEach((item) => {
      if (!unorderedPCodes.includes(item as string)) {
        return;
      }
      sortedBySelectionOrder.push(item as string);
    });

    const finalProduct: [string, number][] = [];
    sortedBySelectionOrder.forEach((item) => {
      const found = sortedResultSubArray.find((result) => result[0] === item);
      if (found) {
        finalProduct.push(found);
      }
    });

    return finalProduct;
  }
}

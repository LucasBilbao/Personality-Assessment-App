import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';
import { QuizCollection } from 'src/app/models/quiz.interface';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';
import { Selections } from 'src/app/models/selections.type';
import { UserService } from '../user/user.service';
import { DEFAULT_RESULTS } from 'src/app/utils/constants';

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
  private results: {
    [key: string]: { minValue: number; timesChosen: number };
  } = DEFAULT_RESULTS;
  private selections!: Selections;

  constructor(private http: HttpClient, private userService: UserService) {}

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

    this.getSubArraysByTimesChosen(sortedResultSubArrays);

    const sortedResultSubArraysByTimesChosen = this.getSubArraysByTimesChosen(
      sortedResultSubArrays
    );

    const resultsSortedByValueAndSelectionOrder: [string, number, number][] =
      sortedResultSubArraysByTimesChosen
        .map(this.sortResultsBySelectionOrder.bind(this))
        .flat(1);

    const [firstPersonality, secondPersonality] =
      resultsSortedByValueAndSelectionOrder;

    this.userService.userInfo.personalities = [
      firstPersonality[0] as PersonalityCodeType,
      secondPersonality[0] as PersonalityCodeType,
    ];

    this.userService.publishUser();
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
        this.results[pCode] = { minValue: 0, timesChosen: 0 };
        return;
      }
      this.results[pCode] = {
        minValue: Math.min(...resultArr),
        timesChosen: resultArr.filter((result) => result > 0).length,
      };
    });
  }

  private sortResultsByValue(): [string, number, number][] {
    const values: [string, number, number][] = Object.entries(this.results).map(
      ([code, result]) => [code, result.minValue, result.timesChosen]
    );
    values.sort(([_1, a, _2], [_3, b, _4]) => a - b);
    values.reverse();

    return [...values];
  }

  private getSubArraysByValues(
    resultsSortedByValue: [string, number, number][]
  ): [string, number, number][][] {
    const subArrays = resultsSortedByValue.reduce(
      (groups: { [key: number]: [string, number, number][] }, result) => {
        const group: [string, number, number][] = groups[result[1]] || [];
        group.push(result);
        groups[result[1]] = group;
        return groups;
      },
      {}
    );
    return Object.values(subArrays);
  }

  private getSubArraysByTimesChosen(
    resultsSortedByValue: [string, number, number][][]
  ): [string, number, number][][][] {
    const finalProduct: [string, number, number][][][] = [];
    resultsSortedByValue.forEach((item) => {
      const subArrays = item.reduce(
        (
          groups: { [key: number]: [string, number, number][] },
          result: [string, number, number]
        ) => {
          const group: [string, number, number][] = groups[result[2]] || [];
          group.push(result);
          groups[result[2]] = group;
          return groups;
        },
        {}
      );
      const reversed = Object.values(subArrays);
      reversed.reverse();
      finalProduct.push(reversed);
    });
    return finalProduct;
  }

  private sortResultsBySelectionOrder(
    sortedResultSubArray: [string, number, number][][]
  ): [string, number, number][] {
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

    const unorderedPCodes = sortedResultSubArray
      .flat(1)
      .map((inner) => inner[0]);

    const sortedBySelectionOrder: string[] = [];
    selectedOrderNoDuplicates.forEach((item) => {
      if (!unorderedPCodes.includes(item as string)) {
        return;
      }
      sortedBySelectionOrder.push(item as string);
    });

    const finalProduct: [string, number, number][] = [];
    sortedBySelectionOrder.forEach((item) => {
      const found = sortedResultSubArray
        .flat(1)
        .find((result) => result[0] === item);
      if (found) {
        finalProduct.push(found);
      }
    });

    return finalProduct;
  }
}

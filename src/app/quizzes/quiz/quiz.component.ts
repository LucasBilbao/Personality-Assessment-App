import { Component, Input } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.interface';

@Component({
  selector: 'paa-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Input() public personalityCode?: string;
  @Input() public title?: string;
  @Input() public imgPath?: string;
  @Input() public isSelected: boolean = false;

  public select() {
    this.isSelected = true;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';

@Component({
  selector: 'paa-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Input() public personalityCode?: PersonalityCodeType;
  @Input() public title?: string;
  @Input() public imgPath?: string;
  @Input() public isSelected: boolean = false;
  @Output() private select: EventEmitter<PersonalityCodeType> =
    new EventEmitter();

  public onDoubleClick() {
    if (this.isSelected) {
      return;
    }
    this.isSelected = true;
    this.select.emit(this.personalityCode);
  }
}

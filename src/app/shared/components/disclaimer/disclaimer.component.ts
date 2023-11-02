import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'paa-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent {
  constructor(private router: Router) {}

  public navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPersonality } from 'src/app/models/userInfo.interface';
import { UserService } from 'src/app/services/user/user.service';
import { PersonalitiesStateFacade } from 'src/app/store/facades/personalities.facade';

@Component({
  selector: 'paa-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  public personalities$ = this.personalitiesFacade.personalities$;
  public isLoading$ = this.personalitiesFacade.isLoading$;
  public userPersonalities: UserPersonality[] =
    this.userService.userInfo.personalities;

  constructor(
    private personalitiesFacade: PersonalitiesStateFacade,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.userInfo.personalities.length === 0) {
      this.onEnd();
      return;
    }

    this.personalitiesFacade.getPersonalities(
      Object.values(this.userService.userInfo.personalities).map(
        (personality) => personality.personalityCode
      )
    );
  }

  onEnd(): void {
    this.router.navigate(['/']);
    this.userService.userInfo.personalities = [];
  }
}

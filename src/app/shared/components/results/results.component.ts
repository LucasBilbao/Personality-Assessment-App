import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private personalitiesFacade: PersonalitiesStateFacade,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.userInfo.personalities) {
      return;
    }

    this.personalitiesFacade.getPersonalities(
      this.userService.userInfo.personalities
    );
  }

  onEnd(): void {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}

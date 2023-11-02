import { Component, OnInit } from '@angular/core';
import { Subscribable } from '../subscribable/subscribable.component';
import { interval, skip, take } from 'rxjs';

@Component({
  selector: 'paa-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss'],
})
export class ThanksComponent extends Subscribable implements OnInit {
  ngOnInit(): void {
    this.addSubscription(
      interval(1000)
        .pipe(take(5), skip(4))
        .subscribe(() => {
          location.reload();
        })
    );
  }
}

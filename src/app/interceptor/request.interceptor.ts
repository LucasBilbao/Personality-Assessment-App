import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizCollection } from '../models/quiz.interface';
import { BACKEND_URL } from '../utils/constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<QuizCollection>,
    next: HttpHandler
  ): Observable<HttpEvent<QuizCollection>> {
    const reqClone = req.clone({
      url: `${BACKEND_URL}${req.url}`,
    });

    return next.handle(reqClone);
  }
}

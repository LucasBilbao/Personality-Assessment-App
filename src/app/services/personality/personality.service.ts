import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personality } from 'src/app/models/personality.interface';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';

@Injectable({
  providedIn: 'root',
})
export class PersonalityService {
  constructor(private http: HttpClient) {}

  public getPersonalities(personalityCodes: PersonalityCodeType[]) {
    return this.http.post<{ personalities: Personality[] }>(
      '/api/v1/personalities/getPersonalities',
      { personalityCodes }
    );
  }
}

/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { GuideStyleSettings } from '../../interfaces';
import { GuideStyleGuideThemeSettingsService } from './guide-style-theme-settings.service';

@Injectable()
export class GuideStyleGuideSettingsService {
  private readonly settingsSubject$: BehaviorSubject<GuideStyleSettings> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private sGGuideConfigService: GuideStyleGuideThemeSettingsService
  ) {
    // not to do
  }

  public async bootstrap(settingsUrl: string, callback?: Function) {
    const { http, settingsSubject$, sGGuideConfigService } = this;

    try {
      const data = await firstValueFrom(http.get('assets/guide-style-settings.json'));
      if (!data) throw new Error('Error');

      sGGuideConfigService.apply(data, callback);
      settingsSubject$.next(data);
    } catch (e) {
      console.error('guide-style-settings not found!');
    }
  }

  public settings(): Observable<any> {
    return this.settingsSubject$.asObservable();
  }
}

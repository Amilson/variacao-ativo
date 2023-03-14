import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CoreCommonsService {
  __params?: any;

  __queryParams?: any;

  __data$?: Observable<any>;

  __control$?: Observable<any>;

  __search$?: BehaviorSubject<any> = new BehaviorSubject({});

  __onDataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    // not to do
  }

  public get<T>(url: string, options?: any) {
    return this.http.get<T>(url, options);
  }
}

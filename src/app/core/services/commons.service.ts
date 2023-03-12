import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonsService {
  __data$?: Observable<any>;

  __control$?: Observable<any>;

  constructor(private http: HttpClient) {
    // not to do
  }

  public get<T>(url: string, options?: any) {
    return this.http.get<T>(url, options);
  }
}

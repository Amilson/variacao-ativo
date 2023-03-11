import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonsService {
  constructor(private http: HttpClient) {
    // not to do
  }

  public get<T>(url: string, options?: any) {
    return this.http.get<T>(url, options);
  }
}

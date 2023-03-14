import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '@store/selectors';
import { CoreCommonsService } from 'src/app/core/services';

@Injectable()
export class IndiceService extends CoreCommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  private handleData(params: any) {
    const { identifier } = params;

    this.__data$ = this.store.select(selectors.list.selectById({ id: identifier }));
    this.__control$ = this.store.select(selectors.list.selectControl());
    this.__onDataChanged$.next(null);
  }

  resolve(params: any, queryParams: any) {
    this.__params = params;
    this.__queryParams = queryParams;
    this.handleData(params);
  }
}

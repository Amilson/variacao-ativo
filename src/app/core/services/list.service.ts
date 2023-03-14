import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { CoreCommonsService } from 'src/app/core/services';

@Injectable()
export class CoreListService extends CoreCommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  private handleData() {
    this.store.dispatch(actions.list.load());

    this.__data$ = this.store.select(selectors.list.selectAllData());
    this.__control$ = this.store.select(selectors.list.selectControl());
  }

  resolve(params: any, queryParams: any) {
    this.__params = params;
    this.__queryParams = queryParams;
    this.handleData();
  }
}

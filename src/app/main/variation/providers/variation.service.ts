import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { CoreCommonsService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { VariationSearchModel } from './variation-search.model';

@Injectable()
export class VariationService extends CoreCommonsService {
  constructor(http: HttpClient, private store: Store, private router: Router) {
    super(http);
  }

  private handleData(params: any, queryParams: any) {
    const { identifier } = params;
    const search = new VariationSearchModel({
      ...params,
      ...queryParams
    });
    this.__search$?.next(search);
    const url = `${environment.baseUrl}${search.getUrlParams()}`;

    this.store.dispatch(actions.variation.load({ url, identifier }));

    this.__data$ = this.store.select(selectors.variation.selectAllData({ identifier }));
    this.__control$ = this.store.select(selectors.variation.selectControl());
    this.__onDataChanged$.next(null);
  }

  resolve(params: any, queryParams: any) {
    this.__params = params;
    this.__queryParams = queryParams;
    this.handleData(params, queryParams);
  }

  doSearch(params: any) {
    const { identifier } = this.__params;
    const search = new VariationSearchModel(params);
    this.router.navigate([`/variation/${identifier}`], {
      queryParams: {
        ...search.toJSON()
      },
      queryParamsHandling: 'merge'
    });
  }
}

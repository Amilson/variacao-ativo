import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import * as selectors from '@store/selectors';
import { CommonsService } from 'src/app/core/services';

@Injectable()
export class MainService extends CommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  /*
  Sobre a API
  Os valores estrão estruturados em vetores, desta forma, você precisará casar a data do pregão 
  (chart.result.timestamp) com o valor de abertura (chart.result.indicators.quote.open) 
  através do indice do vetor.
  */
  private handleData() {
    const url =
      'api/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1676151252&period2=1678570452&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn';

    const identifier = 'PETR4';

    this.store.dispatch(actions.main.load({ url, identifier }));

    this.__data$ = this.store.select(selectors.main.selectAllData({ identifier }));
    this.__control$ = this.store.select(selectors.main.selectControl());
  }

  // eslint-disable-next-line max-len
  // https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1676151252&period2=1678570452
  // eslint-disable-next-line max-len
  // https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1651201200&period2=1654484400&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=WlQ.m12gBMS&corsDomain=finance.yahoo.com

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.handleData();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonsService } from 'src/app/core/services';

@Injectable()
export class MainService extends CommonsService {
  constructor(http: HttpClient) {
    super(http);
  }

  private async getData() {
    const data = await firstValueFrom(
      this.get(
        'api/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1676151252&period2=1678570452&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn'
      )
    );
    console.log(data);
  }

  // https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1676151252&period2=1678570452
  // https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA?symbol=PETR4.SA&period1=1651201200&period2=1654484400&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=WlQ.m12gBMS&corsDomain=finance.yahoo.com

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getData();
  }
}

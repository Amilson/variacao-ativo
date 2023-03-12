import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { main as actions } from '@store/actions';
import { format, fromUnixTime } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { CommonsService } from 'src/app/core/services';

@Injectable()
export class MainService extends CommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  private mappingData(data: any) {
    const dates = data.chart.result[0].timestamp;
    const { close, open, volume } = data.chart.result[0].indicators.quote[0];

    /* const handledDates = dates.map((date: number) => {
      return format(fromUnixTime(date as number), 'dd-MM-yyyy');
    });

    const bucketColors = {
      down: '#DF7772',
      up: '#00CC6F'
    };

    const backgroundColor = Object.entries(dates).map(([key]) => {
      const openValue = open[key];
      const closeValue = close[key];

      const color = bucketColors[closeValue > openValue ? 'up' : 'down'];
      return color;
    });

    const obj = {
      labels: handledDates,
      data: volume,
      backgroundColor
    };
    console.log('obj');
    console.log(obj);

    return []; */

    const colors = {
      down: '#DF7772',
      up: '#00CC6F'
    };

    const handled = Object.entries(dates).map(([key, value]) => {
      const openValue = open[key];
      const closeValue = close[key];
      const label = format(fromUnixTime(value as number), 'dd/MM/yyyy');
      const color = colors[closeValue > openValue ? 'up' : 'down'];
      const volumeValue = volume[key];

      return {
        identifier: 'PETR4',
        id: value,
        label,
        color,
        open: openValue,
        close: closeValue,
        volume: volumeValue
      };
    });

    return handled;
  }

  private update(data: any) {
    this.store.dispatch(
      actions.updateAll({
        data: this.mappingData(data)
      })
    );
  }

  private updateControl(data: any) {
    this.store.dispatch(actions.updateControl({ data }));
  }

  private async loadData(url: string) {
    this.updateControl({ isLoading: true });

    try {
      const data: any = await firstValueFrom(this.get(url));
      this.update(data);
    } catch (e) {
      // not to do
    }

    this.updateControl({ isLoading: false });
  }

  public load(url: string) {
    this.loadData(url);
  }
}

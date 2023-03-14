import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { variation as actions } from '@store/actions';
import { format, fromUnixTime } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { CoreCommonsService } from 'src/app/core/services';

@Injectable()
export class VariationService extends CoreCommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  private mappingData(identifier: string, data: any) {
    const dates = data.chart.result[0].timestamp;
    const { close, open, volume } = data.chart.result[0].indicators.quote[0];

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
      const variation = openValue - closeValue;

      return {
        identifier,
        id: value,
        label,
        color,
        open: openValue,
        close: closeValue,
        volume: volumeValue,
        variation: `${Math.abs(variation)}`
      };
    });

    return handled;
  }

  private update(identifier: string, data: any) {
    this.store.dispatch(
      actions.updateAll({
        data: this.mappingData(identifier, data)
      })
    );
  }

  private updateControl(data: any) {
    this.store.dispatch(actions.updateControl({ data }));
  }

  private async loadData(identifier: string, url: string) {
    this.updateControl({ isLoading: true });

    try {
      const data: any = await firstValueFrom(this.get(url));
      this.update(identifier, data);
    } catch (e) {
      // not to do
    }

    setTimeout(() => {
      this.updateControl({ isLoading: false });
    }, 1500);
  }

  public load(identifier: string, url: string) {
    this.store.dispatch(actions.clear());
    this.loadData(identifier, url);
  }
}

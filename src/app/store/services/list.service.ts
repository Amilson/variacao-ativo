import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { list as actions } from '@store/actions';
import { CoreCommonsService } from 'src/app/core/services';

@Injectable()
export class ListService extends CoreCommonsService {
  constructor(http: HttpClient, private store: Store) {
    super(http);
  }

  private update(data: any[]) {
    this.store.dispatch(
      actions.updateAll({
        data
      })
    );
  }

  private updateControl(data: any) {
    this.store.dispatch(actions.updateControl({ data }));
  }

  private async loadData() {
    this.updateControl({ isLoading: true });

    try {
      const data: any[] = [
        {
          id: 'PETR4.SA',
          title: 'Petróleo Brasileiro S.A. - Petrobras (PETR4.SA)',
          description: 'São Paulo - São Paulo Delayed Price. Currency in BRL'
        },
        {
          id: 'ITUB4.SA',
          title: 'Itaú Unibanco Holding S.A. (ITUB4.SA)',
          description: 'São Paulo - São Paulo Delayed Price. Currency in BRL'
        },
        {
          id: 'VALE3.SA',
          title: 'Vale S.A. (VALE3.SA)',
          description: 'São Paulo - São Paulo Delayed Price. Currency in BRL'
        },
        {
          id: 'MGLU3.SA',
          title: 'Magazine Luiza S.A. (MGLU3.SA)',
          description: 'São Paulo - São Paulo Delayed Price. Currency in BRL'
        },
        {
          id: 'AMER3.SA',
          title: 'Americanas S.A. (AMER3.SA)',
          description: 'São Paulo - São Paulo Delayed Price. Currency in BRL'
        }
      ];
      this.update(data);
    } catch (e) {
      // not to do
    }

    setTimeout(() => {
      this.updateControl({ isLoading: false });
    }, 1500);
  }

  public load() {
    this.loadData();
  }
}

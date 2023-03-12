import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { main as actions } from '@store/actions';
import { main as services } from '@store/services';
import { map } from 'rxjs/operators';

@Injectable()
export class MainEffects {
  load$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.load),
        map(({ url }) => {
          this.service.load(url);
        })
      );
    },
    {
      dispatch: false
    }
  );

  constructor(private actions$: Actions, private service: services.MainService) {
    // not to do
  }
}

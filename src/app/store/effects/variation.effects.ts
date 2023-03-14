import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { variation as actions } from '@store/actions';
import { variation as services } from '@store/services';
import { map } from 'rxjs/operators';

@Injectable()
export class VariationEffects {
  load$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.load),
        map(({ identifier, url }) => {
          this.service.load(identifier, url);
        })
      );
    },
    {
      dispatch: false
    }
  );

  constructor(private actions$: Actions, private service: services.VariationService) {
    // not to do
  }
}

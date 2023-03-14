import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { list as actions } from '@store/actions';
import { list as services } from '@store/services';
import { map } from 'rxjs/operators';

@Injectable()
export class ListEffects {
  load$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.load),
        map(() => {
          this.service.load();
        })
      );
    },
    {
      dispatch: false
    }
  );

  constructor(private actions$: Actions, private service: services.ListService) {
    // not to do
  }
}

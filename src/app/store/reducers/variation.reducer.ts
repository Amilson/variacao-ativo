import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { variation } from '@store/actions';

export const featureKey = 'guide-variation';

export interface State extends EntityState<any> {
  control: {
    isLoading: boolean;
  };
  error: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: (item: any) => {
    return item.id;
  }
});

export const initialState: State = adapter.getInitialState({
  control: {
    isLoading: false
  },
  error: null,
  pagination: null
});

export const reducer = createReducer(
  initialState,
  on(variation.clear, (state: any) => {
    return adapter.removeAll(state);
  }),
  on(variation.updateAll, (state, action) => {
    return adapter.upsertMany(action.data, {
      ...state
    });
  }),
  on(variation.updateControl, (state, action) => {
    return {
      ...state,
      control: {
        ...state.control,
        ...action.data
      }
    };
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

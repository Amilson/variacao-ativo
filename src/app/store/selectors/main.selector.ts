import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromMain } from '@store/reducers';

declare type State = fromMain.State;

export const selectState = createFeatureSelector<fromMain.State>(fromMain.featureKey);

export const selectAll = createSelector(selectState, fromMain.selectAll);

export const selectAllData = (props: { identifier: string }) => {
  return createSelector(selectAll, (entities: any[]): any[] => {
    return entities.filter(({ identifier }) => {
      return identifier === props.identifier;
    });
  });
};

export const selectControl = () => {
  return createSelector(selectState, (state: State): any => {
    return state.control;
  });
};

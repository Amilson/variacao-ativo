import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromVariation } from '@store/reducers';

declare type State = fromVariation.State;

export const selectState = createFeatureSelector<fromVariation.State>(fromVariation.featureKey);

export const selectAll = createSelector(selectState, fromVariation.selectAll);

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

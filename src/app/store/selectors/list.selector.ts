import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromList } from '@store/reducers';

declare type State = fromList.State;

export const selectState = createFeatureSelector<fromList.State>(fromList.featureKey);

export const selectAll = createSelector(selectState, fromList.selectAll);

export const selectAllData = () => {
  return createSelector(selectAll, (entities: any[]): any[] => {
    return entities;
  });
};

export const selectById = (props: { id: string }) => {
  return createSelector(selectAll, (entities: any[]): any => {
    return entities.find(({ id }) => {
      return id === props.id;
    });
  });
};

export const selectControl = () => {
  return createSelector(selectState, (state: State): any => {
    return state.control;
  });
};

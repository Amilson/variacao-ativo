import { createAction, props } from '@ngrx/store';

const clear = createAction('[List] Clear All');
const load = createAction('[List] Load');
const updateAll = createAction('[List] Update All', props<{ data: any[] }>());
const updateControl = createAction('[List] Update Control', props<{ data: any }>());

export { clear, load, updateAll, updateControl };

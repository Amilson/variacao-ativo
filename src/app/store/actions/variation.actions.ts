import { createAction, props } from '@ngrx/store';

const clear = createAction('[Variation] Clear All');
const load = createAction('[Variation] Load', props<{ url: string; identifier: string }>());
const updateAll = createAction('[Variation] Update All', props<{ data: any[] }>());
const updateControl = createAction('[Variation] Update Control', props<{ data: any }>());

export { clear, load, updateAll, updateControl };

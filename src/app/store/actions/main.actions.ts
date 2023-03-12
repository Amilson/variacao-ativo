import { createAction, props } from '@ngrx/store';

const clear = createAction('[Main] Clear All');
const load = createAction('[Main] Load', props<{ url: string; identifier: string }>());
const updateAll = createAction('[Main] Update All', props<{ data: any[] }>());
const updateControl = createAction('[Main] Update Control', props<{ data: any }>());

export { clear, load, updateAll, updateControl };

import { ActionReducerMap } from '@ngrx/store'
import * as counterReducer from  './counter.reducer'

export interface State {
  counter: counterReducer.State
}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer.reducer
}

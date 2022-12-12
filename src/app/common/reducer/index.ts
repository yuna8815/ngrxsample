import { ActionReducerMap } from '@ngrx/store'
import * as counterReducer from  './counter.reducer'
import * as autocompleteReducer from './autocomplete.reducer'

export interface State {
  counter: counterReducer.State,
  autocomplete: autocompleteReducer.State
}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer.reducer,
  autocomplete: autocompleteReducer.reducer
}

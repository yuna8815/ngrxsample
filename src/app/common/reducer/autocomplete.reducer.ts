import { createFeatureSelector, createReducer, on } from "@ngrx/store"
import * as autocompleteActions from '../actions/autocomplete.actions'

export interface userData {
  avatar_url: any;
  html_url: any;
  login: any;
}

export interface State {
  users: userData[]
}

const initialState: State = {
  users: []
}

const autocompleteReducer = createReducer(
  initialState,
  on(autocompleteActions.searchUser, (state: State, {users}) => ({
    users: users
  }))
)

export function reducer(state: State | undefined, actions: any): State {
  return autocompleteReducer(state, actions)
}

export const autocomplete = createFeatureSelector<State>('autocomplete')
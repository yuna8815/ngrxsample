import { createFeatureSelector, createReducer, on } from "@ngrx/store"
import * as autocompleteActions from '../actions/autocomplete.actions'

export interface userData {
  avatar_url: any;
  html_url: any;
  login: any;
}

export interface users {
  user: userData[]
}

const initialState: users = {
  user: []
}

const autocompleteReducer = createReducer(
  initialState,
  on(autocompleteActions.searchUser, (state: users) => state)
)

export function reducer(state: users | undefined, actions: any) {
  return autocompleteReducer(state, actions)
}

export const autocomplete = createFeatureSelector<any>('autocomplete')
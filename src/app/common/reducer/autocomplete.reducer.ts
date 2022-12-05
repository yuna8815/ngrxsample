import { createFeatureSelector, createReducer, on } from "@ngrx/store"
import * as autocompleteActions from '../actions/autocomplete.actions'

export interface userData {
  avatar_url: any;
  html_url: any;
  login: any;
}

export interface users {
  users: userData[]
}

const initialState: users = {
  users: []
}

const autocompleteReducer = createReducer(
  initialState,
  on(autocompleteActions.searchUser, (state: users, {users}) => ({
    users: users
  }))
)

export function reducer(state: users | undefined, actions: any): users {
  return autocompleteReducer(state, actions)
}

export const autocomplete = createFeatureSelector<any>('autocomplete')
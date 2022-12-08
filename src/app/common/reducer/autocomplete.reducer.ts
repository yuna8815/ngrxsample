import { createFeatureSelector, createReducer, on, StoreModule } from "@ngrx/store"
import * as autocompleteActions from '../actions/autocomplete.actions'

export interface userData {
  avatar_url: any;
  html_url: any;
  login: any;
}

export interface State {
  users: userData[],
  selectedUser: userData
}

const initialState: State = {
  users: [],
  selectedUser: {
    avatar_url: null,
    html_url: null,
    login: null
  }
}

const autocompleteReducer = createReducer(
  initialState,
  on(autocompleteActions.searchUser, (state: State, { users }) => ({
    users: users,
    selectedUser: {
      avatar_url: null,
      html_url: null,
      login: null
    }
  })),
  on(autocompleteActions.selectUser, (state: State, { user }) => ({
    users: state.users,
    selectedUser: {
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      login: user.login
    }
  }))
)

export function reducer(state: State | undefined, actions: any): State {
  return autocompleteReducer(state, actions)
}

export const autocomplete = createFeatureSelector<State>('autocomplete')
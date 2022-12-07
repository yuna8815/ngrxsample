import { createAction, props } from "@ngrx/store";
import { userData } from "../reducer/autocomplete.reducer";

export const getUsers = createAction('[Autocomplete Page] getUsers', props<String>())
export const searchUser = createAction('[Autocomplete Page] Search User', props<{users: userData[]}>())
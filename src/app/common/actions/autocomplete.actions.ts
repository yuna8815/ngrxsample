import { createAction, props } from "@ngrx/store";
import { userData } from "../reducer/autocomplete.reducer";

export const inputKeyword = createAction('[Autocomplete Page] Input Keyword')
export const searchUser = createAction('[Autocomplete Page] Search User', props<{users: userData[]}>())
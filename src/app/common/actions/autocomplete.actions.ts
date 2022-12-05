import { createAction, props } from "@ngrx/store";
import { users } from "../reducer/autocomplete.reducer";

export const searchUser = createAction('[Autocomplete Page] Search User', props<users>())
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  map, switchMap } from "rxjs/operators";
import { UserService } from "src/app/api/user.service";
import * as autocompleteActions from 'src/app/common/actions/autocomplete.actions'
import { userData } from 'src/app/common/reducer/autocomplete.reducer'

@Injectable()
export class AutocompleteEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ){}
  
  getUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(autocompleteActions.getUsers),
      switchMap((keyword: String) => {
        console.log()
        return this.userService.getUsers$(keyword[0]).pipe(
          map((users: userData[]) => {
            console.log()
            return autocompleteActions.searchUser({users})
          })
        )
      })
    )
  );
}
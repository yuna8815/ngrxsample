import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { userData } from '../common/reducer/autocomplete.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers$(query: string) {
    console.log()
    return ajax.getJSON(`https://api.github.com/search/users?q=${query}`).pipe(
      map((v: any) => {
        console.log()
        let tempUsers: userData[] = []
        for(let user of v.items) {
          let userData: userData = {
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            login: user.login
          }
          tempUsers.push(userData)
        }
        return tempUsers
      })
    )
  }
}

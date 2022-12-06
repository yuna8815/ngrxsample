import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, retry, share, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createSelector, Store } from '@ngrx/store';
import * as autocompleteReducer from 'src/app/common/reducer/autocomplete.reducer'
import * as autocompleteActions from 'src/app/common/actions/autocomplete.actions'
import { State } from '../common/reducer';

const autocompleteSelector = {
  autocomplete: createSelector(autocompleteReducer.autocomplete, state => state.users)
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage implements OnInit {

  // @ViewChild('suggestLayer') layer$!: ElementRef;
  @ViewChild('loading') loading$!: ElementRef;
  @ViewChild('search') search$!: ElementRef;

  searchButtonA$ = new Subject<void>();
  inputKeywordA$ = new Subject<string>();

  keyword: string = '';

  keyup$: any;
  user$: any;

  usersV$ = this.store$.select(autocompleteSelector.autocomplete)

  constructor(
    private store$: Store<State>
  ) {
  }

  ngOnInit() {
    this.searchButtonA$.pipe(
      debounceTime(300), // 300ms 뒤에 데이터를 전달한다.
      map((v) => 
        this.keyword
      ),
      distinctUntilChanged(),  // 특수키가 입력된 경우에는 나오지 않기 위해 중복 데이터 처리
      // tap(v => console.log("form keyup$", v)),
      share(),
      filter((query: any) => {
        return query.trim().length > 0
      }),
      tap(v => this.showLoading()),
      switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
      tap(v => this.hideLoading()),
      retry(2),
      finalize(() => this.hideLoading()),
      // tap(v => console.log("form user$", v))
      map((v: any) => {
        let tempUsers: autocompleteReducer.userData[] = []
        for(let user of v.items) {
          let userData: autocompleteReducer.userData = {
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            login: user.login
          }
          tempUsers.push(userData)
        }
        return tempUsers
      })
    ).subscribe((users: any) => {
      this.store$.dispatch(autocompleteActions.searchUser({users}))
    })

    this.inputKeywordA$.subscribe((keyword: string) => {
      this.keyword = keyword
    })
  }

  showLoading() {
    this.loading$.nativeElement.style.display = "block";
  }

  hideLoading() {
    this.loading$.nativeElement.style.display = "none";
  }

}

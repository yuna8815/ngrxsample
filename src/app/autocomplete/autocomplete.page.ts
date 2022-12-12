import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, retry, share, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createSelector, Store } from '@ngrx/store';
import * as autocompleteReducer from 'src/app/common/reducer/autocomplete.reducer'
import * as autocompleteActions from 'src/app/common/actions/autocomplete.actions'
import { State } from '../common/reducer';

const autocompleteSelector = {
  users: createSelector(autocompleteReducer.autocomplete, state => state.users),
  selectedUser: createSelector(autocompleteReducer.autocomplete, state => state.selectedUser)
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage implements OnInit {

  // @ViewChild('suggestLayer') layer$!: ElementRef;
  @ViewChild('loading') loading$!: ElementRef;

  searchButtonA$ = new Subject<string>();
  inputKeywordV$ = new BehaviorSubject<string>('');
  selectUserA$ = new Subject<autocompleteReducer.userData>();

  selectUser$ = this.store$.select(autocompleteSelector.selectedUser)

  usersV$ = this.store$.select(autocompleteSelector.users)

  userIdV$ = new BehaviorSubject<string>('')
  userImageV$ = new BehaviorSubject<string>('')

  keyword: string = '';

  constructor(
    private store$: Store<State>
  ) {
  }

  ngOnInit() {
    this.searchButtonA$.subscribe(() => {
      this.store$.dispatch(autocompleteActions.getUsers(this.keyword))
    })

    this.inputKeywordV$.subscribe(keyword => {
      this.keyword = keyword
    })

    this.selectUserA$.subscribe((user) => {
      console.log()
      this.store$.dispatch(autocompleteActions.selectUser({user}))
    })

    this.selectUser$.subscribe((selectedUser) => {
      this.userIdV$.next(selectedUser.login)
      this.userImageV$.next(selectedUser.avatar_url)
    })

    // this.selectUser$.subscribe(())
  }

  showLoading() {
    this.loading$.nativeElement.style.display = "block";
  }

  hideLoading() {
    this.loading$.nativeElement.style.display = "none";
  }

}

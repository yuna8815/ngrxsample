import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { State } from '../common/reducer';
import * as counterReducer from '../common/reducer/counter.reducer'

const counterSelector = {
  counter: createSelector(counterReducer.counter, state => state.counter)
}

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  counter$ = this.store.select(counterSelector.counter)

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
  }

}

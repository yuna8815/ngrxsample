import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../common/actions/counter.actions';
import { State } from '../common/reducer';
import * as counterReducer from '../common/reducer/counter.reducer';

const counterSelector = {
  counter: createSelector(counterReducer.counter, state => state.counter)
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {

  // count$: Observable<number>;

  count$ = this.store.select(counterSelector.counter);

  constructor(
    private store: Store<State>
  ) {
    // Connect 'this.count$' stream to the current store 'count' state
    // this.count$ = store.select('count');
  }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    console.log(this.count$)
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}

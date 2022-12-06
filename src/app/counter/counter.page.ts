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

  test() {
    let value = {USER : '홍길동'} 
    this.printOut1(value)
    this.printOut4()
    this.printOut2()
    this.printOut6()
    this.printOut5(value)
    this.printOut3()
  }

  printOut1(val: any){
    console.log("11111")
  }
  printOut2(){
    console.log("22222")
    this.printOut4()
  }
  printOut3(){
    console.log("33333")
  }
  printOut4(){
    console.log("44444")
    this.printOut3()
  }
  printOut5(val : any){
    console.log("55555")
    val.USER = "김아무개"
  }
  printOut6(){
    console.log("66666")
    let value = {USER : '이순신'} 
    this.printOut5(value)
  }
}

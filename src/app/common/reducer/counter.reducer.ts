import { createFeatureSelector, createReducer, on } from '@ngrx/store';
// import { increment, decrement, reset } from '../actions/counter.actions';
import * as counterActions from '../actions/counter.actions'

// Reducer 1. state 형태 정의
export interface State {
  counter: number
}

// Reducer 2. state 초기 값 설정
// export const initialState = 0;
export const initialState: State = {
  counter: 0
}

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );

// Reducer 3. reducer function
export const counterReducer = createReducer(
  initialState,
  on(counterActions.increment, state => ({
    ...state,
    counter: state.counter + 1
  })),
  on(counterActions.decrement, (state: State) => ({
    counter: state.counter - 1
  })),
  on(counterActions.reset, (state: State) => ({
    counter: 0
  }))
);

// Register feature state 2.
export const counterFeatureKey = 'counter';

// createFeatureSelector(featureName: any)
export const counter = createFeatureSelector<State>('counter');
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';

interface OrderData {
  price: string,
  amount: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Action Stream
  priceA$ = new Subject<string>();
  amountA$ = new Subject<string>();

  // View Stream
  totalOrderAmountV$ = new BehaviorSubject<string>('0');

  // Action Stream에서 특정 계산 및 조건
  totalOrderAmount$ : Observable<string>

  orderData: OrderData = {price: '0', amount: '0'}

  constructor() {
    // combineLatest 두 Stream의 가장 마지막에 변경된 값을 합친다
    this.totalOrderAmount$ = combineLatest(this.priceA$, this.amountA$).pipe(
      // map() 함수를 pipe() 안에 사용할때는
      // import {map} from 'rxjs/operators'; 를 선언
      map(([price, amount]: [string, string]) => {
        // + 를 붙혀주면 number 타입으로 변경됨
        const total = +price * +amount
        return total.toString()
      })
    )
  }

  ngOnInit() {
    // Action Stream을 구독
    this.priceA$.subscribe((priceValue: string) => {
      this.orderData.price = priceValue
    })

    this.amountA$.subscribe((amountValue: string) => {
      this.orderData.amount = amountValue
    })

    // priceA$과 amountA$을 합한 값이 들어간 Observabledmf 구독하여 View Stream에 뿌려줌
    this.totalOrderAmount$.subscribe((totalOrderAmount: string) => {
      this.totalOrderAmountV$.next(totalOrderAmount)
    })
  }

}

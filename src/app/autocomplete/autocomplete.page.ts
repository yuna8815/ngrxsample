import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { fromEvent, Observable, partition } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, retry, share, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export interface user {
  avatar_url: any;
  html_url: any;
  login: any;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage implements OnInit {

  @ViewChild('suggestLayer') layer$!: ElementRef;
  @ViewChild('loading') loading$!: HTMLDivElement;
  @ViewChild('search') search$!: ElementRef;

  keyup$: any;
  user$: any;

  constructor() {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.keyup$ = fromEvent(this.search$.nativeElement, "keyup").pipe(
      debounceTime(300), // 300ms 뒤에 데이터를 전달한다.
      map((event: any) => 
        event.target.value
      ),
      distinctUntilChanged(),  // 특수키가 입력된 경우에는 나오지 않기 위해 중복 데이터 처리
      tap(v => console.log("form keyup$", v)),
      share()
    )

    let user$ = this.keyup$.pipe(
      filter((query: any) => {
        console.log("let user$", query)
        return query.trim().length > 0
      })
    )
    
    user$.pipe(
      // tap(this.showLoading),
      switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
      // tap(this.hideLoading),
      retry(2),
      // finalize(this.hideLoading),
      tap(v => console.log("form user$", v))
    ).subscribe({
      next: (v: any) => {
        console.log("user$ subscribe")
        this.drawLayer(v.items);
      },
      error: (e: any) => {
        console.error(e);
        alert(e.message)
      }
    });

    // reset$.pipe(
    //   tap(v => this.layer$.nativeElement.innerHTML = ""),
    //   tap(v => console.log("from reser$", v))
    // ).subscribe();
  }

  drawLayer(items: any) {
    this.layer$.nativeElement.innerHTML = items.map((user: user) => {
      return `<li style="border: 1px solid #bec8d8;list-style: none;">
      <img src="${user.avatar_url}" width="50px" height="50px" style="position:relative;float:left;margin-right: 10px;"/>
      <p style="line-height: 50px;margin:0px;padding:0px;"><a href="${user.html_url}" target="_blank">${user.login}</a></p>
      </li>`
    }).join("")
  }

  showLoading() {
    this.loading$.style.display = "block";
  }

  hideLoading() {
    this.loading$.style.display = "none";
  }

}

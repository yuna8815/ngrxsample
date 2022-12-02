import { Component, OnInit, ViewChild} from '@angular/core';
import { fromEvent, Observable, } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';
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

  @ViewChild('suggestLayer') layer$!: HTMLUListElement;
  @ViewChild('loading') loading$!: HTMLDivElement;
  @ViewChild('search') search$!: HTMLInputElement;

  user$ = fromEvent(this.search$, "keyup")
    .pipe(
      debounceTime(300), // 300ms 뒤에 데이터를 전달한다.
      map((event: any) => 
        event.target.value
      ),
      distinctUntilChanged(),  // 특수키가 입력된 경우에는 나오지 않기 위해 중복 데이터 처리    
      filter(query => 
        query != null
        // query.trim().length > 0
      ),
      mergeMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
  );

  constructor() {
  }

  ngOnInit() {
    this.user$.subscribe((v: any) => {
      this.drawLayer(v.items);
    });
  }

  ionViewWillEnter() {
    console.log(this.layer$)
  }

  drawLayer(items: any) {
    this.layer$.innerHTML = items.map((user: user) => {
      return `<li class="user">
      <img src="${user.avatar_url}" width="50px" height="50px"/>
      <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
// import { counterReducer } from './common/reducer/counter.reducer';
// import { CounterPageModule } from './counter/counter.module';
import { reducers } from './common/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Reducer 4. root에 state 등록
    // StoreModule.forRoot({ count: counterReducer})
    
    // Register feature state 1.
    StoreModule.forRoot(reducers),
    // Register feature state 4.
    // CounterPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

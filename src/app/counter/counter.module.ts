import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounterPageRoutingModule } from './counter-routing.module';

import { CounterPage } from './counter.page';
import { StoreModule } from '@ngrx/store';
import { counterFeatureKey, counterReducer } from '../common/reducer/counter.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounterPageRoutingModule,
    // Register feature state 3.
    StoreModule.forFeature(counterFeatureKey, counterReducer)
  ],
  declarations: [CounterPage]
})
export class CounterPageModule {}

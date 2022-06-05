import { MovementsFeature } from './store/movements.reducer';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from './../../shared/pipe/truncate.pipe';
import { MovementComponent } from './components/movement/movement.component';
import { MaterialModule } from './../../shared/material/material.module';

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovementsEffects } from './store/movements.effects';

@NgModule({
  declarations: [MovementsComponent, MovementComponent, TruncatePipe],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature(MovementsFeature),
    EffectsModule.forFeature([MovementsEffects]),
  ],
  exports: [MaterialModule],
})
export class MovementsModule {}

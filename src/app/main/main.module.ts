import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule } from '@guide-style';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as effects from '@store/effects';
import * as reducers from '@store/reducers';
import * as services from '@store/services';
import { MainChartComponent } from './chart';
import { MainComponent } from './main.component';
import { MainResolver, MainService } from './providers';

@NgModule({
  declarations: [MainComponent, MainChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        resolve: {
          user: () => {
            return inject(MainResolver).resolve();
          }
        }
      }
    ]),
    GuideButtonModule,
    StoreModule.forFeature(reducers.fromMain.featureKey, reducers.fromMain.reducer),
    EffectsModule.forFeature([effects.MainEffects])
  ],
  providers: [MainResolver, MainService, services.main.MainService]
})
export class MainModule {}

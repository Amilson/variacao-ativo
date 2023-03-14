import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { GuideButtonModule, GuideHeaderModule, GuideLoadingModule } from '@guide-style';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as effects from '@store/effects';
import * as reducers from '@store/reducers';
import * as services from '@store/services';
import { VariationChartComponent } from './chart';
import { VariationFilterComponent } from './filter';
import { VariationHeaderComponent } from './header';
import { IndicesModule } from './indices';
import { IndiceService, VariationResolver, VariationService } from './providers';
import { VariationComponent } from './variation.component';

@NgModule({
  declarations: [
    VariationComponent,
    VariationFilterComponent,
    VariationChartComponent,
    VariationHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':identifier',
        component: VariationComponent,
        resolve: {
          data: () => {
            return inject(VariationResolver).resolve();
          }
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ]),
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    GuideButtonModule,
    GuideHeaderModule,
    GuideLoadingModule,
    IndicesModule,
    StoreModule.forFeature(reducers.fromVariation.featureKey, reducers.fromVariation.reducer),
    EffectsModule.forFeature([effects.VariationEffects])
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    VariationResolver,
    VariationService,
    IndiceService,
    services.variation.VariationService
  ]
})
export class VariationModule {}

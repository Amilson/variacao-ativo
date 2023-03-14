import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as effects from '@store/effects';
import * as reducers from '@store/reducers';
import * as services from '@store/services';
import { CoreListResolver, CoreListService } from './core/services';
import { MainLayoutComponent, MainLayoutModule } from './layouts/main';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => {
      return import('./main').then((m: any) => {
        return m.ListModule;
      });
    },
    resolve: {
      data: () => {
        return inject(CoreListResolver).resolve();
      }
    }
  },
  {
    path: 'variation',
    component: MainLayoutComponent,
    loadChildren: () => {
      return import('./main').then((m: any) => {
        return m.VariationModule;
      });
    },
    resolve: {
      data: () => {
        return inject(CoreListResolver).resolve();
      }
    }
  },
  {
    path: 'components',
    component: MainLayoutComponent,
    loadChildren: () => {
      return import('./main').then((m: any) => {
        return m.ComponentsModule;
      });
    }
  }
];

@NgModule({
  imports: [
    MainLayoutModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(reducers.fromList.featureKey, reducers.fromList.reducer),
    EffectsModule.forFeature([effects.ListEffects])
  ],
  exports: [RouterModule],
  providers: [CoreListResolver, CoreListService, services.list.ListService]
})
export class AppRoutingModule {}

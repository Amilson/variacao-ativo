import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule } from '@guide-style';
import { MainComponent } from './main.component';
import { MainService } from './providers';
import { MainResolver } from './providers/resolver.service';

@NgModule({
  declarations: [MainComponent],
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
    GuideButtonModule
  ],
  providers: [MainResolver, MainService]
})
export class MainModule {}

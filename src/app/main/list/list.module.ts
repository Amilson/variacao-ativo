import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule, GuideHeaderModule, GuideLoadingModule } from '@guide-style';
import { DataComponent } from './data';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent, DataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    GuideButtonModule,
    GuideHeaderModule,
    GuideLoadingModule
  ]
})
export class ListModule {}

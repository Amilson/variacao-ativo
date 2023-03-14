import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { GuideLoadingComponent } from './loading.component';

@NgModule({
  declarations: [GuideLoadingComponent],
  imports: [CommonModule],
  exports: [GuideLoadingComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GuideLoadingModule {}

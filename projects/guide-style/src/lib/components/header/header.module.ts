import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule } from '../button';
import { GuideHeaderComponent } from './header.component';

@NgModule({
  declarations: [GuideHeaderComponent],
  imports: [CommonModule, RouterModule, GuideButtonModule],
  exports: [GuideHeaderComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GuideHeaderModule {}

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { GuideButtonComponent } from './button.component';

@NgModule({
  declarations: [GuideButtonComponent],
  imports: [CommonModule],
  exports: [GuideButtonComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GuideButtonModule {}

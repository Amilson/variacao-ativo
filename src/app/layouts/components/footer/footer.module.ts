import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterLayoutComponent } from './footer.component';

@NgModule({
  declarations: [FooterLayoutComponent],
  exports: [FooterLayoutComponent],
  imports: [CommonModule, RouterModule]
})
export class FooterLayoutModule {}

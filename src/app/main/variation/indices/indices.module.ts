import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataComponent } from './data';
import { IndicesComponent } from './indices.component';

@NgModule({
  declarations: [IndicesComponent, DataComponent],
  exports: [IndicesComponent],
  imports: [CommonModule, FormsModule]
})
export class IndicesModule {}

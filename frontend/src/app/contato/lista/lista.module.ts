import { FilterPipe } from './../../filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[FilterPipe]
})
export class ListaModule { }

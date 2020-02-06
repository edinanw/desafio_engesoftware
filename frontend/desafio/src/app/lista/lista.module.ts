import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista.component';



@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class ListaModule { }

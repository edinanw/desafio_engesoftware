import { FormsModule } from '@angular/forms';
import { ListaModule } from './lista/lista.module';
import { ContatoComponent } from './contato.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    ListaModule,
    FormsModule
  ]
})
export class ContatoModule { }

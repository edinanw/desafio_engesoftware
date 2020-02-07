import { ListaModule } from './contato/lista/lista.module';
import { ContatoModule } from './contato/contato.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { LoadingComponent } from './loading/loading.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { ModalComponent } from './modal/modal.component';
import { Modal } from './modal';

import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing/routing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ContatoComponent } from './contato/contato.component';
import { EditarComponent } from './contato/editar/editar.component';
import { CadastrarComponent } from './contato/cadastrar/cadastrar.component';
import { ListaComponent } from './contato/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ModalComponent,
    RegistrarComponent,    
    EditarComponent,
    CadastrarComponent,    
    EditarComponent,
    ContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RoutingModule,
    HomeModule,
    FormsModule,
    ContatoModule,
    ListaModule,
    ContatoModule
  ],
  exports: [ListaModule],
  providers: [AuthService, Modal, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

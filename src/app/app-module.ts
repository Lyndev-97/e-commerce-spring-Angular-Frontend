import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './pages/home/home';
import { Categorias } from './pages/categorias/categorias';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from './services/domain/categoria.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';

@NgModule({
  declarations: [
    App,
    Home,
    Categorias
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    CategoriaService,
    ErrorInterceptorProvider
  ],
  bootstrap: [App]
})
export class AppModule { }

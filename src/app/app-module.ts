import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './pages/home/home';
import { Categorias } from './pages/categorias/categorias';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CategoriaService } from './services/domain/categoria.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { Profile } from './pages/profile/profile';
import { Menu } from './pages/menu/menu';
import { ClienteService } from './services/domain/cliente.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    App,
    Home,
    Categorias,
    Profile,
    Menu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"], // Ajuste para os seus domínios
        disallowedRoutes: ["localhost:8080/auth/login"] // Rotas que NÃO devem receber o token
      }
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    //provideHttpClient(withFetch()),
    CategoriaService,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    //JwtHelperService
    ClienteService
  ],
  bootstrap: [App]
})
export class AppModule { }

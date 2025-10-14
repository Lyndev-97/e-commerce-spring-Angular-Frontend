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
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
//import { ErrorDialog } from './interceptors/error-dialog/error-dialog';
import { Signup } from './pages/signup/signup';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoService } from './services/domain/estado.service';
import { CidadeService } from './services/domain/cidade.service';
import { Produtos } from './pages/produtos/produtos';
import { ProdutoService } from './services/domain/produto.service';
import { ProdutoDetail } from './pages/produto-detail/produto-detail';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    App,
    Home,
    Categorias,
    Profile,
    Menu,
    //ErrorDialog,
    Signup,
    Produtos,
    ProdutoDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["localhost:8080/auth/login"] // Rotas que NÃO devem receber o token
      }
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    //provideHttpClient(withFetch()),
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    //JwtHelperService
    ClienteService,
    EstadoService,
    CidadeService,
    ProdutoService
  ],
  bootstrap: [App]
})
export class AppModule { }

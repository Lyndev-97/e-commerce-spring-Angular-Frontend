import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Categorias } from './pages/categorias/categorias';
import { Profile } from './pages/profile/profile';
import { Signup } from './pages/signup/signup';
import { Produtos } from './pages/produtos/produtos';
import { ProdutoDetail } from './pages/produto-detail/produto-detail';
import { Cart } from './pages/cart/cart';

const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'categories',
    component: Categorias
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'ProdutosPage/:id',
    component: Produtos
  },
  {
    path: 'ProdutoDetail/:id',
    component: ProdutoDetail
  },
  {
    path: 'CartPage',
    component: Cart
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

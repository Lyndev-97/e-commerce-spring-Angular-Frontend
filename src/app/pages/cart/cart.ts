import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {


  items: CartItem[] | null = null;
  test: number | null = null;

  constructor(public cartService: CartService, public produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    let cart = this.cartService.getCart();
    if (cart) {
      this.items = cart.itens;
    }
  }

  loadImageUrls() {
    if (this.items) {
      for (var i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}`;// /prod/${item.produto.id}-small.jpg`;
        },
          error => { });
      }
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.router.navigate(['/categories']);
  }
  checkout() {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    throw new Error('Method not implemented.');
  }

}

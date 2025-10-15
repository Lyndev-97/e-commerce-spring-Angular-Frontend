import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {


  items: CartItem[] | null = null;
  test: number | null = null;

  constructor(public cartService: CartService, public produtoService: ProdutoService) { }

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


  increaseQuantity(arg0: any) {
    throw new Error('Method not implemented.');
  }
  total() {
    this.test = 1 + 1;
    return this.test;
  }
  goOn() {
    throw new Error('Method not implemented.');
  }
  checkout() {
    throw new Error('Method not implemented.');
  }
  removeItem(arg0: any) {
    throw new Error('Method not implemented.');
  }
  decreaseQuantity(arg0: any) {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    throw new Error('Method not implemented.');
  }

}

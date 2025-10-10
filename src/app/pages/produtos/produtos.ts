import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.dto';

@Component({
  selector: 'app-produtos',
  standalone: false,
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss'
})
export class Produtos implements OnInit {

  items: ProdutoDTO[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: "1",
        nome: 'Mouse',
        preco: 80.99
      },
      {
        id: "2",
        nome: 'Teclado',
        preco: 100.99
      }
    ]
  };

  checkScrollForMoreData() {
    throw new Error('Method not implemented.');
  }

  showDetail(arg0: any) {
    throw new Error('Method not implemented.');
  }

  endRefresh($event: TouchEvent) {
    throw new Error('Method not implemented.');
  }

  startRefresh($event: TouchEvent) {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    throw new Error('Method not implemented.');
  }

}

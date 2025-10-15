import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@Component({
  selector: 'app-produto-detail',
  standalone: false,
  templateUrl: './produto-detail.html',
  styleUrl: './produto-detail.scss'
})
export class ProdutoDetail implements OnInit {

  item!: ProdutoDTO;
  produto_id: string | null = null;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.produto_id = params.get('id');
      console.log('Produto ID:', this.produto_id);

      this.produtoService.findById(this.produto_id).subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
        error => { });
    });
  }

  goToCart() {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    this.router.navigate(['/categories']);
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.router.navigate(['/CartPage']);
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id + '').subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}`; // /prod${this.item.id}.jpg`;
    },
      error => { });
  }


}

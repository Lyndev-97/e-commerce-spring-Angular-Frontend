import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-produto-detail',
  standalone: false,
  templateUrl: './produto-detail.html',
  styleUrl: './produto-detail.scss'
})
export class ProdutoDetail implements OnInit {

  item!: ProdutoDTO;
  produto_id: string | null = null;

  constructor(public produtoService: ProdutoService, private route: ActivatedRoute, private router: Router) { }

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

  addToCart(arg0: any) {
    throw new Error('Method not implemented.');
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id + '').subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}`; // /prod${this.item.id}.jpg`;
    },
      error => { });
  }


}

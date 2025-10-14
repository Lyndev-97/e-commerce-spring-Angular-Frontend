import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/domain/produto.service';
import { Page } from '../../models/pageContent';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-produtos',
  standalone: false,
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss'
})
export class Produtos implements OnInit {

  items: ProdutoDTO[] = [];
  categoriaId: string | null = null;

  constructor(private route: ActivatedRoute, public produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      console.log('Categoria ID:', this.categoriaId);
      if (this.categoriaId) {
        this.produtoService.findByCategoria(this.categoriaId).subscribe(response => {

          const pageResponse = response as Page<ProdutoDTO>;
          this.items = pageResponse.content;
          this.loadImageUrls();
        },
          error => { });
      }

    });

  };

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}`;// /prod/${item.id}-small.jpg`;
      },
        error => { });
    }
  }

  checkScrollForMoreData() {
    throw new Error('Method not implemented.');
  }

  showDetail(produto_id: number | null | undefined) {

    if (!produto_id) {
      console.error("ERRO DE DADOS: O item clicado não possui um 'id' válido.");
      return;
    }

    const idString = produto_id + '';
    this.router.navigate(['/ProdutoDetail', idString]);
  }

  endRefresh($event: TouchEvent) {
    throw new Error('Method not implemented.');
  }

  startRefresh($event: TouchEvent) {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    this.router.navigate(['/categories']);
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items!: CategoriaDTO[];

  constructor(private categoriaService: CategoriaService, private router: Router) {
  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
      error => { }
    );
  }


  showProdutos() {
    this.router.navigate(['/ProdutosPage']);
  }



}

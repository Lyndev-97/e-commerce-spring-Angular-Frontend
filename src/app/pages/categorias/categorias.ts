import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias implements OnInit{

  constructor(private categoriaService: CategoriaService){
  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error)
  });
  }



}

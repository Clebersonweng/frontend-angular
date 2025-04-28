import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Product } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule, RouterModule, ProductTableComponent],
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((products) => this.products = products);
  }

  navigateToNew() {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Deseja excluir este produto?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }
}

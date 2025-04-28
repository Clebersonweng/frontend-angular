import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Product } from '../../models/product.model';

declare var bootstrap: any;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductTableComponent],
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProductId?: number;

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

  openDeleteModal(productId: number) {
    this.selectedProductId = productId;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.selectedProductId) {
      this.productService.delete(this.selectedProductId).subscribe(() => {
        this.loadProducts();
        const modalElement = document.getElementById('deleteModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      });
    }
  }
}

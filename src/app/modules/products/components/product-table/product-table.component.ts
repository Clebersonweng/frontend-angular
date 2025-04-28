import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html'
})

export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}

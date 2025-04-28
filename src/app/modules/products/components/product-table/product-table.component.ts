import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './product-table.component.html'
})

export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}

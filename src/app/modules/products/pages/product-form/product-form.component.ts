// import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductFormFieldsComponent } from '../../components/product-form-fields/product-form-fields.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductFormFieldsComponent],
  templateUrl: './product-form.component.html'
})

export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.productService.getById(this.id).subscribe((product) => {
        this.form.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const product: Product = { id: this.id!, ...this.form.value };

    if (this.isEdit) {
      this.productService.update(product).subscribe(() => this.back());
    } else {
      this.productService.create(product).subscribe(() => this.back());
    }
  }

  back() {
    this.router.navigate(['/products']);
  }
}

// import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
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
  categories: any[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
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

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    if (this.id) {
      this.isEdit = true;
      this.isLoading = true;

      this.productService.getById(this.id).subscribe({
        next: (product) => {
          this.form.patchValue({ ...product, category: product.category });
          this.isLoading = false; // Set loading to false when data is received
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const product: Product = { id: this.id!, ...this.form.value };

    this.isLoading = true;

    const operation$ = this.isEdit
      ? this.productService.update(product)
      : this.productService.create(product);

    operation$.subscribe({
      next: () => {
        this.isLoading = false;
        this.back();
      },
      error: (error) => {
        console.error('Error saving product:', error);
        this.isLoading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/products']);
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/pages/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'products/new',
    loadComponent: () => import('./modules/products/pages/product-form/product-form.component')
      .then(m => m.ProductFormComponent)
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./modules/products/pages/product-form/product-form.component')
      .then(m => m.ProductFormComponent)
  },
];
